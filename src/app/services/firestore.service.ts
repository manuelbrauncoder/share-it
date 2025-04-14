import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  DocumentData,
  documentId,
  DocumentSnapshot,
  Firestore,
  getDoc,
  query,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { AuthUser } from '../interfaces/AuthUser';
import { from, map, Observable } from 'rxjs';
import { UserHelper } from '../helpers/UserHelper';
import { FirestorePath } from '../enums/FirestorePath';
import { Group } from '../interfaces/Group';
import { User } from '../interfaces/User';
import { setLogLevel, LogLevel } from "@angular/fire";
import { Expense } from '../interfaces/Expense';

setLogLevel(LogLevel.SILENT);

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore = inject(Firestore);

  constructor() {}

  /**
   * Save a AuthUser in firestore,
   * replace it if the id exists
   *
   * @param authUser
   * @param id
   * @returns
   */
  saveUser(authUser: AuthUser, id: string): Observable<void> {
    const user = UserHelper.createUser(authUser, id);
    const uploadRef = doc(this.firestore, FirestorePath.Users, user.id);
    const promise = setDoc(uploadRef, user).catch((err) => {
      throw err;
    });
    return from(promise);
  }

  /**
   * Save a group in firestore
   * replaces the group if the id exists
   * @param group
   * @returns
   */
  saveGroup(group: Group): Observable<void> {
    const uploadRef = doc(this.firestore, FirestorePath.Groups, group.id);
    const promise = setDoc(uploadRef, group).catch((err) => {
      throw err;
    });
    return from(promise);
  }

  /**
   * Save a expense in firestore or
   * replace it if the id exists
   * 
   * @param expense 
   * @returns 
   */
  saveExpense(expense: Expense): Observable<void> {
    const uploadRef = doc(this.firestore, FirestorePath.Expanses, expense.id);
    const promise = setDoc(uploadRef, expense).catch((err) => {
      throw err;
    });
    return from(promise);
  }

  /**
   * Fetches the group by the given id
   *
   * @param id
   * @returns an Observable with the group or undefined if no group found
   */
  getGroupByID(id: string): Observable<Group | undefined> {
    const docRef = doc(this.firestore, FirestorePath.Groups, id);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot<DocumentData>) =>
        docSnap.exists() ? (docSnap.data() as Group) : undefined
      )
    );
  }

  /**
   * Fetches the user by the given id
   *
   * @param id user id
   * @returns an Observable with the User or undefined
   */
  getUserByID(id: string): Observable<User | undefined> {
    const docRef = doc(this.firestore, FirestorePath.Users, id);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot) =>
        docSnap.exists() ? (docSnap.data() as User) : undefined
      )
    );
  }

  /**
   * Fetches the users bei the given ids
   * 
   * !! The 'in' operator supports only 30 ids in the array !!
   * 
   * @param ids user ids
   * @returns an Observable with an User Array
   */
  getUsersByIDs(ids: string[]): Observable<User[]> {
    const usersRef = collection(this.firestore, FirestorePath.Users);
    const usersQuery = query(usersRef, where(documentId(), 'in', ids));
    return collectionData(usersQuery) as Observable<User[]>;
  }

  /**
   * Fetching the group collections where the user is a member
   *
   * @param id user id
   * @returns an Observable with a Group Array
   */
  getGroupsByUserID(id: string): Observable<Group[]> {
    const collRef = collection(this.firestore, FirestorePath.Groups);
    const groupsQuery = query(collRef, where('users', 'array-contains', id));
    return collectionData(groupsQuery) as Observable<Group[]>;
  }
}
