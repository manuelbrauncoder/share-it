import { AbstractControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Expense } from '../interfaces/Expense';

export class ExpenseHelper {
    
  static createExpense(expense: AbstractControl, payerID: string, groupID: string): Expense {
    return {
      id: uuidv4(),
      currency: '€',
      value: expense.get('value')?.value ?? 0,
      payerID: payerID,
      groupID: groupID,
      title: expense.get('title')?.value ?? '',
      desc: expense.get('desc')?.value ?? ''
    };
  }
}
