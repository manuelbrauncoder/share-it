import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Group } from '../../interfaces/Group';
import { UiService } from '../../services/ui.service';
import { User } from '../../interfaces/User';

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
  users: User[] = [];

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
            this.getUsersForGroup();
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

  getUsersForGroup() {
    if (this.currentGroup) {
      const userIDs: string[] = this.currentGroup.users.map((id) => id);
      this.firestoreService.getUsersByIDs(userIDs).subscribe({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (err) => {
          console.log('Error fetching users for group', err);
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
