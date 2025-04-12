import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';
import { User } from '../../interfaces/User';
import { UserHelper } from "../../helpers/UserHelper";

@Component({
  selector: 'app-start-screen',
  imports: [],
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

  getCurrentUser() {
    const id = this.authService.auth.currentUser?.uid;
    if (id) {
      this.firestoreService.getUserByID(id)
      .subscribe({
        next: (data: User | undefined) => {
          if (data) {
            this.currentUser = data;
            console.log(this.currentUser);
          } else {
            console.log('user not found');
          }
        },
        error: (err) => {
          console.log('Error fetching User', err);
        }
      });
    } else {
      console.log('No User logged in');
    }
  }
}
