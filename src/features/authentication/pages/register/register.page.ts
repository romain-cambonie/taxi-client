import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, mergeWith, Observable, Subject, switchMap } from 'rxjs';
import { passwordValidator, usernameValidator } from '../../validators';
import { toPasswordErrorMessages, toUsernameErrorMessage } from '../../presentation';
import { Register, REGISTER_REF } from '../../providers';

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

  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  private readonly _registerWhileLoading$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(() => this._register$(this.registerForm.value.username, this.registerForm.value.password)),
    map(() => false)
  );

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._registerWhileLoading$));

  public constructor(@Inject(REGISTER_REF) private readonly _register$: Register) {}

  public onRegister = (): void =>
    this.registerForm.invalid ? this.registerForm.markAllAsTouched() : this._isLoading$.next(true);

  public toUsernameErrorMessage = (usernameErrors?: ValidationErrors | null): string =>
    usernameErrors == null ? '' : toUsernameErrorMessage(usernameErrors);

  public toPasswordErrorMessage = (passwordErrors?: ValidationErrors | null): string[] =>
    passwordErrors == null ? [] : toPasswordErrorMessages(passwordErrors);
}
