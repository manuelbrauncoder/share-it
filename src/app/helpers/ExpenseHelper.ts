import { AbstractControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from '../interfaces/Expense';

export class ExpenseHelper {
    
  static createExpense(expense: AbstractControl, payerID: string): Expense {
    return {
      id: uuidv4(),
      currency: 'EU',
      value: expense.get('value')?.value ?? 0,
      payerID: '',
      title: expense.get('title')?.value ?? '',
      desc: expense.get('desc')?.value ?? ''
    };
  }
}
