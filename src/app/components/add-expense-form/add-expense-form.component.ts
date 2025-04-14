import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { FirestoreService } from '../../services/firestore.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ExpenseHelper } from '../../helpers/ExpenseHelper';
import { Expense } from '../../interfaces/Expense';
import { Group } from '../../interfaces/Group';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-add-expense-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-expense-form.component.html',
  styleUrl: './add-expense-form.component.scss',
})
export class AddExpenseFormComponent implements OnInit {
  uiService = inject(UiService);
  firestoreService = inject(FirestoreService);
  authService = inject(AuthenticationService);

  group = input.required<Group | undefined>();
  currentUser: User | undefined;

  expense = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    value: new FormControl<number>(0, Validators.required),
    desc: new FormControl<string>(''),
  });

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    const userID = this.authService.auth.currentUser?.uid;
    if (userID) {
      this.firestoreService.getUserByID(userID).subscribe({
        next: (user: User | undefined) => {
          if (user) {
            this.currentUser = user;
          }
        },
      });
    }
  }

  submit() {
    if (this.expense.valid) {
      const group = this.group();
      if (this.currentUser && group) {
        const expense = ExpenseHelper.createExpense(
          this.expense,
          this.currentUser.id,
          group.id
        );
        group.expenses.push(expense.id);
        this.saveExpense(expense, group, this.currentUser);
      }
    }
  }

  cancel() {
    this.expense.reset();
    this.uiService.isAddExpenseDialogPresented = false;
  }

  saveGroup(group: Group, user: User) {
    this.firestoreService.saveGroup(group).subscribe({
      next: () => {
        this.saveUser(user);
      },
      error: (err) => {
        this.uiService.setToastMessage(
          true,
          'Oops, da ist etwas schief gelaufen.'
        );
      },
    });
  }

  saveUser(user: User) {
    this.firestoreService.saveUser(user).subscribe({
      next: () => {
        this.uiService.setToastMessage(false, 'Ausgabe hinzugefügt');
        this.uiService.isAddExpenseDialogPresented = false;
      },
      error: (err) => {
        this.uiService.setToastMessage(
          true,
          'Oops, da ist etwas schief gelaufen.'
        );
      },
    });
  }

  /**
   * saves the new expense in firestore
   * @param expense
   */
  saveExpense(expense: Expense, group: Group, user: User) {
    this.firestoreService.saveExpense(expense).subscribe({
      next: () => {
        this.saveGroup(group, user);
      },
      error: (err) => {
        this.uiService.setToastMessage(
          true,
          'Oops, da ist etwas schief gelaufen.'
        );
      },
    });
  }
}
