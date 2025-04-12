import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';

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

  testToast() {
    this.uiService.setToastMessage(false, 'Test Toast Message');
  }
}
