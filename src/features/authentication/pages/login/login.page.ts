import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { toPasswordErrorMessages, toUsernameErrorMessage } from '../../presentation';

type LoginForm = {
  username: string;
  password: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html'
})
export class LoginPage {
  public loginForm = new FormGroup<Record<keyof LoginForm, AbstractControl>>({
    username: new FormControl<LoginForm['username']>('', [Validators.required]),
    password: new FormControl<LoginForm['password']>('', [Validators.required])
  });

  public onLogin = (): void => {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm);
  };

  public toUsernameErrorMessage = (usernameErrors?: ValidationErrors | null): string =>
    usernameErrors == null ? '' : toUsernameErrorMessage(usernameErrors);

  public toPasswordErrorMessage = (passwordErrors?: ValidationErrors | null): string[] =>
    passwordErrors == null ? [] : toPasswordErrorMessages(passwordErrors);
}
