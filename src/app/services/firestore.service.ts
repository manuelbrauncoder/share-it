import { inject, Injectable } from '@angular/core';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import { AuthUser } from '../interfaces/AuthUser';
import { from, map, Observable } from 'rxjs';
import { UserHelper } from '../helpers/UserHelper';
import { FirestorePath } from '../enums/FirestorePath';
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../interfaces/Group';
import { User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  firestore = inject(Firestore);

  constructor() {}

  saveUser(authUser: AuthUser, id: string): Observable<void> {
    const user = UserHelper.createUser(authUser, id);
    const uploadRef = doc(this.firestore, FirestorePath.Users, user.id);
    const promise = setDoc(uploadRef, user)
      .then(() => {
        // toast success?
      })
      .catch((err) => {
        // toast error
      });
    return from(promise);
  }

  saveGroup(group: Group): Observable<void> {
    const uploadRef = doc(this.firestore, FirestorePath.Groups, group.id);
    const promise = setDoc(uploadRef, group)
      .then(() => {
        // success
      })
      .catch((err) => {
        // toast error
      });
    return from(promise);
  }

  getUserByID_OLD(id: string): Observable<User | undefined> {
    const docRef = doc(this.firestore, FirestorePath.Users, id);
    const promise = getDoc(docRef)
      .then((docSnap: DocumentSnapshot) => {
        return docSnap.data() as User;
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

  getUserByID(id: string): Observable<User | undefined> {
    const docRef = doc(this.firestore, FirestorePath.Users, id);
    return from(getDoc(docRef)).pipe(
      map((docSnap: DocumentSnapshot) =>
        docSnap.exists() ? (docSnap.data() as User) : undefined
      )
    );
  }
}
