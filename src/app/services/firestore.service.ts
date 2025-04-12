import { inject, Injectable } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { AuthUser } from '../interfaces/AuthUser';
import { from, Observable } from 'rxjs';
import { UserHelper } from '../helpers/UserHelper';
import { FirestorePath } from "../enums/FirestorePath";

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
        // toast success
      })
      .catch((err) => {
        // toast error
      });
    return from(promise);
  }
}
