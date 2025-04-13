import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupHelper } from '../../helpers/GroupHelper';
import { Group } from '../../interfaces/Group';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-group-form',
  imports: [ReactiveFormsModule],
  templateUrl: './group-form.component.html',
  styleUrl: './group-form.component.scss'
})
export class GroupFormComponent {
  router = inject(Router);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);
  
  group = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    desc: new FormControl('', [Validators.minLength(4)]),
  })

  submit() {
    if(this.group.valid) {
      const group: Group = GroupHelper.createGroup(this.group);
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
          this.router.navigate(['/start'])
      },
      error: (err) => {
        this.uiService.setToastMessage(true, 'Fehler beim Erstellen der Gruppe');
      }
    })
  }
}
