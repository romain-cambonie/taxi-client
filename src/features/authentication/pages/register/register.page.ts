import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeWith, Observable, Subject, switchMap } from 'rxjs';
import { RegisterAction, REGISTER_ACTION } from '../../providers';
import { START_LOADING, STOP_LOADING, whileLoading } from '../../presentation';
import { formatRegisterError } from './register.presenter';
import { REGISTER_FORM, RegisterFormValues, setRegisterErrorToForm } from './register.form';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html'
})
export class RegisterPage {
  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  public registerForm: FormGroup<Record<keyof RegisterFormValues, FormControl>> = REGISTER_FORM;

  public username: FormControl<RegisterFormValues['username']> = this.registerForm.controls.username;

  public password: FormControl<RegisterFormValues['password']> = this.registerForm.controls.password;

  private readonly _defaultUsername: string | null = this._route.snapshot.queryParamMap.get('username');

  private handleRegisterActionError = (error: Error, caught: Observable<void>): Observable<void> => {
    setRegisterErrorToForm(formatRegisterError(error));
    this._isLoading$.next(STOP_LOADING);
    return caught;
  };

  private readonly _register$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(whileLoading(() => this._registerAction$(this.username.value, this.password.value))),
    catchError(this.handleRegisterActionError),
    map(() => STOP_LOADING)
  );

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._register$));

  public constructor(
    @Inject(REGISTER_ACTION) private readonly _registerAction$: RegisterAction,
    private readonly _route: ActivatedRoute
  ) {
    this._defaultUsername && this.username.setValue(this._defaultUsername);
  }

  public onRegister = (): void =>
    REGISTER_FORM.invalid ? REGISTER_FORM.markAllAsTouched() : this._isLoading$.next(START_LOADING);
}
