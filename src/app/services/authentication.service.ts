import { inject, Injectable } from '@angular/core';
import {
  Auth,
  authState,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  deleteUser,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { AuthUser } from '../interfaces/AuthUser';
import { from, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  firestoreService = inject(FirestoreService);
  auth = inject(Auth);
  authState$ = authState(this.auth);
  router = inject(Router);

  constructor() {}

  register(user: AuthUser): Observable<void> {
    const promise = setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        return createUserWithEmailAndPassword(this.auth, user.email, user.pwd!);
      })
      .then((userCredential: UserCredential) => {
        this.firestoreService.saveAuthUser(user, userCredential.user.uid);
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

  login(user: AuthUser): Observable<void> {
    const promise = setPersistence(this.auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(this.auth, user.email, user.pwd!);
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        // handle error
      });
    return from(promise);
  }

  deleteUser(): Observable<void> {
    const currentUser = this.auth.currentUser;
    const promise = deleteUser(currentUser!)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        // error handling
      });
    return from(promise);
  }
}
