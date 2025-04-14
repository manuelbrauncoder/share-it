import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GroupHelper } from '../../helpers/GroupHelper';
import { Group } from '../../interfaces/Group';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-group-form',
  imports: [ReactiveFormsModule],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss',
})
export class GroupFormComponent {
  router = inject(Router);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);
  authService = inject(AuthenticationService);

  group = new FormGroup({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    desc: new FormControl<string>('', [Validators.minLength(4)]),
  });

  submit() {
    if (this.group.valid) {
      const userID = this.authService.auth.currentUser?.uid;
      let group: Group = GroupHelper.createGroup(this.group);
      if (userID) {
        group.users.push(userID);
      }
      this.saveGroup(group);
    } else {
      this.group.markAllAsTouched();
    }
  }

  saveGroup(group: Group) {
    this.firestoreService.saveGroup(group).subscribe({
      next: () => {
        this.uiService.setToastMessage(false, 'Gruppe erstellt');
        this.group.reset();
        this.router.navigate(['/start']);
      },
      error: (err) => {
        this.uiService.setToastMessage(
          true,
          'Fehler beim Erstellen der Gruppe'
        );
      },
    });
  }
}
