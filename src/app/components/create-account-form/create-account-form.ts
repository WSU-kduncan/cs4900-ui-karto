import { HttpErrorResponse } from '@angular/common/http';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CreateUserRequest, UserService } from '@services/user.service';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.scss',
})
export class CreateAccountForm {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private readonly userService = inject(UserService);
  protected serverErrors = signal('');
  protected form = new FormGroup(
    {
      email: new FormControl('', [Validators.email, Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(31),
      ]),
      // Password from ChatGPT
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(128),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])\S+$/),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    {
      validators: [this.passwordsMatch],
    },
  );
  get password() {
    return this.form.get('password')!;
  }
  get email() {
    return this.form.get('email')!;
  }
  get username() {
    return this.form.get('username')!;
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')!;
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const request: CreateUserRequest = {
      email: this.email.value!,
      password: this.password.value!,
      username: this.username.value!,
    };
    this.userService
      .createUser(request)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.serverErrors.set(err.error ?? 'Could not create user');
        },
        complete: () => {
          this.router.navigate(['/login']);
        },
      });
    console.log('Submitted');
  }
  passwordsMatch(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return pass === confirm ? null : { passwordsNotMatching: true };
  }
}
