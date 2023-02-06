import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { usernameValidator } from '../../validators';

type RegisterForm = {
  name: string;
  username: string;
  password: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html'
})
export class RegisterPage {
  public registerForm = new FormGroup<Record<keyof RegisterForm, AbstractControl>>({
    name: new FormControl<RegisterForm['name']>('', [Validators.required]),
    username: new FormControl<RegisterForm['username']>('', [Validators.required, usernameValidator]),
    password: new FormControl<RegisterForm['password']>('', [Validators.required, Validators.minLength(6)])
  });

  public register = (): void => {
    console.log(this.registerForm);
  };
}
