import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthenticationService } from './services/authentication.service';
import { AuthUser } from './interfaces/AuthUser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'share-it';

  authService = inject(AuthenticationService);
  currentUser: AuthUser | null | undefined;

  constructor() {
    effect(() => {
      this.currentUser = this.authService.currentUserSig();
      if (this.currentUser) {
        console.log("User:", this.currentUser);
      } else {
        console.log("no user logged in");
      }
    })
  }
}
