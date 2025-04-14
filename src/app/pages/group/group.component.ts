import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Group } from '../../interfaces/Group';
import { UiService } from '../../services/ui.service';
import { User } from '../../interfaces/User';
import { Clipboard } from '@angular/cdk/clipboard';
import { AddExpenseFormComponent } from '../../components/add-expense-form/add-expense-form.component';
import { slideFromBottom } from '../../utils/animations';
import { Expense } from '../../interfaces/Expense';
import { Subscription } from 'rxjs';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-group',
  imports: [AddExpenseFormComponent, DecimalPipe],
  animations: [slideFromBottom],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class GroupComponent implements OnInit, OnDestroy {
  activatedRoute = inject(ActivatedRoute);
  firestoreService = inject(FirestoreService);
  uiService = inject(UiService);
  router = inject(Router);

  groupID: string | null = null;
  currentGroup?: Group;

  users: User[] = [];

  expenses: Expense[] = [];
  expensesSubscription!: Subscription;

  constructor(private clipboard: Clipboard) {}

  ngOnInit(): void {
    this.groupID = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCurrentGroup();
  }

  ngOnDestroy(): void {
    if (this.expensesSubscription) {
      this.expensesSubscription.unsubscribe();
    }
  }

  toggleAddExpenseDialog() {
    this.uiService.isAddExpenseDialogPresented =
      !this.uiService.isAddExpenseDialogPresented;
  }

  copyIDForSharing() {
    if (this.groupID) {
      const success = this.clipboard.copy(this.groupID);
      if (success) {
        this.uiService.setToastMessage(false, 'ID in Zwischenablage kopiert');
      } else {
        this.uiService.setToastMessage(true, 'Bitte wiederholen');
      }
    }
  }

  subscribeExpensesForGroup() {
    if (this.currentGroup) {
      this.expensesSubscription = this.firestoreService
        .getExpensesForGroup(this.currentGroup.expenses)
        .subscribe({
          next: (expenses: Expense[]) => {
            this.expenses = expenses;
          },
          error: (err) => {
            console.log('Error fetching expenses for the group', err);
          },
        });
    }
  }

  getCurrentGroup() {
    if (this.groupID) {
      this.firestoreService.getGroupByID(this.groupID).subscribe({
        next: (data: Group | undefined) => {
          if (data) {
            this.currentGroup = data;
            this.getUsersForGroup();
            this.subscribeExpensesForGroup();
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
