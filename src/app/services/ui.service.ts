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

  constructor() { }

  redirectTo(path: string) {
    this.router.navigate([path]);
  }

  showtoast() {
    this.isToastPresented = true;
    setTimeout(() => {
      this.isToastPresented = false;
    }, 3000);
  }

  setToastMessage(isToastError: boolean, toastMessage: string) {
    this.toastMessage = toastMessage;
    this.isToastError = isToastError;

    this.showtoast();
  }
}
