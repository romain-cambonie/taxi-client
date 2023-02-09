import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { passwordValidator, usernameValidator } from '../../validators';
import { toPasswordErrorMessages, toUsernameErrorMessage } from '../../presentation';

type RegisterForm = {
  username: string;
  password: string;
  cgu: boolean;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html'
})
export class RegisterPage {
  public registerForm = new FormGroup<Record<keyof RegisterForm, AbstractControl>>({
    username: new FormControl<RegisterForm['username']>('', [Validators.required, usernameValidator]),
    password: new FormControl<RegisterForm['password']>('', [Validators.required, Validators.minLength(8), passwordValidator]),
    cgu: new FormControl<RegisterForm['cgu']>(false, [Validators.requiredTrue])
  });

  public onRegister = (): void => {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm);
  };

  public toUsernameErrorMessage = (usernameErrors?: ValidationErrors | null): string =>
    usernameErrors == null ? '' : toUsernameErrorMessage(usernameErrors);

  public toPasswordErrorMessage = (passwordErrors?: ValidationErrors | null): string[] =>
    passwordErrors == null ? [] : toPasswordErrorMessages(passwordErrors);
}
