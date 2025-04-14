import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthUser } from '../../interfaces/AuthUser';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserHelper } from '../../helpers/UserHelper';
import { UiService } from '../../services/ui.service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);
  uiService = inject(UiService);
  

  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submit() {
    if (this.user.valid) {
      const authUser = UserHelper.createAuthUser(this.user);
      this.loginUser(authUser);
    } else {
      this.user.markAllAsTouched();
      console.log('invalid');
    }
  }

  loginUser(user: AuthUser) {
    this.authService.login(user).subscribe({
      next: () => {
        this.user.reset();
        setTimeout(() => {
          this.router.navigate(['/start']);
        }, 300);
      },
      error: (err) => {
        this.uiService.setToastMessage(true, 'Fehler beim einloggen, bitte nocheinmal probieren.')
        console.log('error', err);
      },
    });
  }
}
