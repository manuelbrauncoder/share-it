import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Group } from '../../interfaces/Group';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-group',
  imports: [],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);
  router = inject(Router);

  groupID: string | null = null;
  currentGroup?: Group;

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCurrentGroup();
  }

  getCurrentGroup() {
    if (this.groupID) {
      this.firestoreService.getGroupByID(this.groupID).subscribe({
        next: (data: Group | undefined) => {
          if (data) {
            this.currentGroup = data;
          } else {
            this.setError();
          }
        },
        error: (err) => {
          this.setError();
        },
      });
    }
  }

  /**
   * show error toast and
   * redirect to /start
   */
  setError() {
    this.uiService.setToastMessage(true, 'Gruppe nicht gefunden');
    this.router.navigate(['/start']);
  }
}
