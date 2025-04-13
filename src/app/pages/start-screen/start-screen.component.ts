import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';
import { User } from '../../interfaces/User';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start-screen',
  imports: [RouterLink],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  authService = inject(AuthenticationService);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);

  currentUser?: User

  constructor() {
    this.getCurrentUser();
  }

  /**
   * Fetches the current user from firestore
   */
  getCurrentUser() {
    const id = this.authService.auth.currentUser?.uid;
    if (id) {
      this.firestoreService.getUserByID(id)
      .subscribe({
        next: (data: User | undefined) => {
          if (data) {
            this.currentUser = data;
          } else {
            console.log('user not found');
          }
        },
        error: (err) => {
          console.log('Error fetching User', err);
        }
      });
    }
  }
}
