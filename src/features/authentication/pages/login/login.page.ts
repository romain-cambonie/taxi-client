import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, mergeWith, Observable, Subject, switchMap } from 'rxjs';
import { START_LOADING, STOP_LOADING, whileLoading } from '../../presentation';
import { LOGIN_ACTION, LoginAction } from '../../providers';
import { LOGIN_FORM, LoginFormValues, setLoginErrorToForm } from './login.form';
import { formatLoginError } from './login.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html'
})
export class LoginPage {
  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  public loginForm: FormGroup<Record<keyof LoginFormValues, FormControl>> = LOGIN_FORM;

  public username: FormControl<LoginFormValues['username']> = this.loginForm.controls.username;

  public password: FormControl<LoginFormValues['password']> = this.loginForm.controls.password;

  private readonly _defaultUsername: string | null = this._route.snapshot.queryParamMap.get('username');

  private handleLoginActionError = (error: Error, caught: Observable<void>): Observable<void> => {
    setLoginErrorToForm(formatLoginError(error));
    this._isLoading$.next(STOP_LOADING);
    return caught;
  };

  private readonly _login$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(whileLoading(() => this._loginAction$(this.username.value, this.password.value))),
    catchError(this.handleLoginActionError),
    map(() => STOP_LOADING)
  );

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._login$));

  public constructor(
    @Inject(LOGIN_ACTION) private readonly _loginAction$: LoginAction,
    private readonly _route: ActivatedRoute
  ) {
    this._defaultUsername && this.username.setValue(this._defaultUsername);
  }

  public onLogin = (): void => (LOGIN_FORM.invalid ? LOGIN_FORM.markAllAsTouched() : this._isLoading$.next(START_LOADING));
}
