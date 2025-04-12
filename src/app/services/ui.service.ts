import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  isToastPresented: boolean = false;
  toastMessage: string = "";
  isToastError: boolean = false;

  constructor() { }

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
