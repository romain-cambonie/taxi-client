import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

type ForgotPasswordForm = {
  username: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './forgot-password.page.html'
})
export class ForgotPasswordPage {
  public forgotPasswordForm = new FormGroup<Record<keyof ForgotPasswordForm, FormControl>>({
    username: new FormControl<ForgotPasswordForm['username']>('', [Validators.required])
  });

  public username: FormControl<ForgotPasswordForm['username']> = this.forgotPasswordForm.controls.username;

  private readonly _defaultUsername: string | null = this._route.snapshot.queryParamMap.get('username');

  public constructor(private readonly _route: ActivatedRoute) {
    this._defaultUsername && this.username.setValue(this._defaultUsername);
  }

  public onForgotPassword = (): void => {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
  };
}
