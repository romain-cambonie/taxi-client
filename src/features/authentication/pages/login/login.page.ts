import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.loginForm);
  };
}
