import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthUser } from '../../interfaces/AuthUser';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  authService = inject(AuthenticationService);
  router = inject(Router);

  user = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      pwd: new FormControl('', [Validators.required, Validators.minLength(6)]),
      pwdRepeat: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    },
    { validators: this.passwordMatchValidator }
  );

  submit() {
    if (this.user.valid) {
      const authUser = this.createAuthUser();
      this.registerUser(authUser);
    } else {
      this.user.markAllAsTouched();
      console.log('invalid');
    }
  }

  registerUser(user: AuthUser) {
    this.authService.register(user).subscribe({
      next: () => {
        // show toast message success
        this.user.reset();
        setTimeout(() => {
          this.router.navigate(['/start'])
        }, 2000);
      },
      error: (err) => {
        // show toast message error
        console.log('error');
        
      },
    });
  }

  createAuthUser(): AuthUser {
    return {
      email: this.user.get('email')?.value ?? '',
      name: this.user.get('name')?.value ?? '',
      id: uuidv4(),
      pwd: this.user.get('pwd')?.value ?? '',
    };
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const pwd = control.get('pwd')?.value;
    const pwdRepeat = control.get('pwdRepeat')?.value;
    if (pwd !== pwdRepeat) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
