import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AuthUser } from '../interfaces/authUser';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  auth = inject(Auth);
  currentUserSig = signal<AuthUser | null | undefined>(undefined);

  constructor() { }

  register(user: AuthUser): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.auth, user.email, user.pwd)
    .then((response) => {
      // save user in firestore
    })
    .catch((err) => {
      // handle error
    })
    return from(promise)
  }

  login(user: AuthUser): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.auth,
      user.email,
      user.pwd
    )
      .then(() => {
        // do things after login
      })
      .catch((err) => {
        // handle error
      });
    return from(promise);
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        // do things after logout
      })
      .catch((err) => {
        // handle error
      });
  }

  deleteUser(): Observable<void> {
    const currentUser = this.auth.currentUser;
    const promise = deleteUser(currentUser!)
      .then(() => {
        // do things after user is deleted
      })
      .catch((err) => {
        // error handling
      });
    return from(promise);
  }
}
