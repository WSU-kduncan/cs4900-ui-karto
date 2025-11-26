import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest, UserService } from '@services/user.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, Button],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  userService = inject(UserService);
  destroyRef = inject(DestroyRef);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  error = signal('');

  get email() {
    return this.form.get('email')!;
  }
  get password() {
    return this.form.get('password')!;
  }

  onSubmit() {
    const request: LoginRequest = {
      email: this.email.value!,
      password: this.password.value!,
    };
    this.userService
      .login(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.error.set(err.error ?? 'Invalid Credentials');
        },
        complete: () => {
          this.router.navigate(['/cars']);
        },
      });
    console.log('Submitted');
  }
}
