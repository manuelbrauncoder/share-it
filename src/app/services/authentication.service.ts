import { inject, Injectable, signal } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword, signOut, UserCredential } from '@angular/fire/auth';
import { AuthUser } from '../interfaces/AuthUser';
import { from, Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  firestoreService = inject(FirestoreService);
  auth = inject(Auth);
  currentUserSig = signal<AuthUser | null | undefined>(undefined);

  constructor() { }

  /**
   * Register a new User and save him in firestore
   * @param user AuthUser
   * @returns an Observable with the UserCredential
   */
  register(user: AuthUser): Observable<UserCredential> {
    const promise = createUserWithEmailAndPassword(this.auth, user.email, user.pwd!)
    .then((userCredential: UserCredential) => {
      this.firestoreService.saveUser(user, userCredential.user.uid);
      this.setUserSignal(user);
      return userCredential;
    })
    .catch((err) => {
      throw err;
    })
    return from(promise)
  }

  login(user: AuthUser): Observable<UserCredential> {
    const promise = signInWithEmailAndPassword(
      this.auth,
      user.email,
      user.pwd!
    )
      .then((userCredential: UserCredential) => {
        this.setUserSignal(user);
        return userCredential
      })
      .catch((err) => {
        throw err;
      });
    return from(promise);
  }

  /**
   * Save User data in a signal
   * 
   * @param user AuthUser
   */
  setUserSignal(user: AuthUser) {
    this.currentUserSig.set({
      email: user.email,
      name: user.name
    })
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth)
      .then(() => {
        // do things after logout
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
        // do things after user is deleted
      })
      .catch((err) => {
        // error handling
      });
    return from(promise);
  }
}
