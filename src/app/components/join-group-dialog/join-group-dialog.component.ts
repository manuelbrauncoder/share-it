import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { Group } from '../../interfaces/Group';
import { AuthenticationService } from '../../services/authentication.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-join-group-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './join-group-dialog.component.html',
  styleUrl: './join-group-dialog.component.scss',
})
export class JoinGroupDialogComponent {
  firestoreService = inject(FirestoreService);
  authService = inject(AuthenticationService);
  uiService = inject(UiService);

  group = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  closeDialog() {
    this.uiService.isJoinGroupDialogPresented = false;
  }

  submit() {
    if (this.group.valid) {
      const id = this.group.get('id')?.value;
      this.firestoreService.getGroupByID(id!).subscribe({
        next: (group: Group | undefined) => {
          const userID = this.authService.auth.currentUser?.uid;
          if (group && userID) {
            group.users.push(userID);
            this.saveGroup(group);
          }
        },
      });
    }
  }

  saveGroup(group: Group) {
    this.firestoreService.saveGroup(group).subscribe({
      next: () => {
        this.uiService.setToastMessage(false, 'Das hat geklappt 🙂');
        this.closeDialog();
      },
      error: (err) => {
        this.uiService.setToastMessage(
          true,
          'Ooops, da ist etwas schief gelaufen 🙁'
        );
        this.closeDialog();
      },
    });
  }
}
