import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { FirestoreService } from '../../services/firestore.service';
import { UiService } from '../../services/ui.service';
import { User } from '../../interfaces/User';
import { Router, RouterLink } from '@angular/router';
import { Group } from '../../interfaces/Group';
import { Subscription } from 'rxjs';
import { JoinGroupDialogComponent } from "../../components/join-group-dialog/join-group-dialog.component";

@Component({
  selector: 'app-start-screen',
  imports: [RouterLink, JoinGroupDialogComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent implements OnDestroy, OnInit {
  authService = inject(AuthenticationService);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);
  router = inject(Router);

  currentUser?: User;
  groups: Group[] = [];
  groupsSubscription!: Subscription;

  redirectToGroupDetail(id: string) {
    this.router.navigate(['/group', id]);
  }

  ngOnDestroy(): void {
    if (this.groupsSubscription) {
      this.groupsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.subscribeGroups();
  }

  showJoinGroupDialog() {
    this.uiService.isJoinGroupDialogPresented = true;
  }

  /**
   * Subscribe the users groups
   */
  subscribeGroups() {
    const id = this.authService.auth.currentUser?.uid;
    if (id) {
      this.groupsSubscription = this.firestoreService.getGroupsByUserID(id)
      .subscribe({
        next: (groups: Group[]) => {
          this.groups = groups;
        },
        error: (err) => { }
      })
    }
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
