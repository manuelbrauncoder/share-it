import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  router = inject(Router);

  isToastPresented: boolean = false;
  toastMessage: string = "";
  isToastError: boolean = false;

  isJoinGroupDialogPresented: boolean = false;
  isSidebarPresented: boolean = false;
  isAddExpenseDialogPresented: boolean = false;

  constructor() { }

  /**
   * redirect to the given path
   * @param path 
   */
  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  /**
   * shows the toast message and hide it
   * after timeout
   */
  showtoast() {
    this.isToastPresented = true;
    setTimeout(() => {
      this.isToastPresented = false;
    }, 3000);
  }

  /**
   * 
   * @param isToastError set to true if message is an error
   * @param toastMessage the message string
   */
  setToastMessage(isToastError: boolean, toastMessage: string) {
    this.toastMessage = toastMessage;
    this.isToastError = isToastError;
    this.showtoast();
  }
}
