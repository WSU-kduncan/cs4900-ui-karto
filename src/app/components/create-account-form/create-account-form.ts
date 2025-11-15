import { Component, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-create-account-form',
  imports: [ReactiveFormsModule, Button],
  templateUrl: './create-account-form.html',
  styleUrl: './create-account-form.scss',
})
export class CreateAccountForm {
  form = new FormGroup(
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
    console.log(this.form);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('Submitted');
  }
  passwordsMatch(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;

    return pass === confirm ? null : { passwordsNotMatching: true };
  }
}
