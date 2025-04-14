import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { FirestoreService } from '../../services/firestore.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ExpenseHelper } from '../../helpers/ExpenseHelper';
import { Expense } from '../../interfaces/Expense';

@Component({
  selector: 'app-add-expense-form',
  imports: [],
  templateUrl: './add-expense-form.component.html',
  styleUrl: './add-expense-form.component.scss',
})
export class AddExpenseFormComponent {
  uiService = inject(UiService);
  firestoreService = inject(FirestoreService);
  authService = inject(AuthenticationService);

  expense = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    value: new FormControl<number>(0, Validators.required),
    desc: new FormControl<string>(''),
  });

  submit() {
    if (this.expense.valid) {
      const userID = this.authService.auth.currentUser?.uid;
      if (userID) {
        const expense = ExpenseHelper.createExpense(this.expense, userID);
        this.saveExpense(expense);
      }
    }
  }

  saveExpense(expense: Expense) {
    this.firestoreService.saveExpense(expense).subscribe({
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
}
