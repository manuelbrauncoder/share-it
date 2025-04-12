import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AuthUser } from '../interfaces/AuthUser';
import { from, Observable } from 'rxjs';
import { UserHelper } from '../helpers/UserHelper';
import { FirestorePath } from "../enums/FirestorePath";
import { v4 as uuidv4 } from 'uuid';
import { Group } from '../interfaces/Group';

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
    return from(promise)
  }
}
