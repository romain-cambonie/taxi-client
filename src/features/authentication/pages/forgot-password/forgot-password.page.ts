import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

type ForgotPasswordForm = {
  username: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.page.html'
})
export class ForgotPasswordPage {
  public forgotPasswordForm = new FormGroup<Record<keyof ForgotPasswordForm, AbstractControl>>({
    username: new FormControl<ForgotPasswordForm['username']>('', [Validators.required])
  });

  public onForgotPassword = (): void => {
    console.log(this.forgotPasswordForm);
  };
}
