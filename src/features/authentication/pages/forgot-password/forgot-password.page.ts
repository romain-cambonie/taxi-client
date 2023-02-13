import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { toUsernameErrorMessage } from '../../presentation';

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
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    // todo: set username from login page if exist
    console.log(this.forgotPasswordForm);
  };

  public toUsernameErrorMessage = (usernameErrors?: ValidationErrors | null): string =>
    usernameErrors == null ? '' : toUsernameErrorMessage(usernameErrors);
}
