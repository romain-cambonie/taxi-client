import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { catchError, map, mergeWith, Observable, shareReplay, Subject, switchMap } from 'rxjs';
import { RegisterAction, REGISTER_ACTION } from '../../providers';
import { formatRegisterError, START_LOADING, STOP_LOADING, whileLoading } from './register.presenter';
import { REGISTER_FORM, setRegisterErrorToForm } from './register.form';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.page.html'
})
export class RegisterPage {
  public registerForm = REGISTER_FORM;

  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  private handleRegisterActionError = (error: Error, caught: Observable<void>): Observable<void> => {
    setRegisterErrorToForm(formatRegisterError(error));
    this._isLoading$.next(STOP_LOADING);
    return caught;
  };

  private readonly _register$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(whileLoading(() => this._registerAction$(REGISTER_FORM.value.username, REGISTER_FORM.value.password))),
    catchError(this.handleRegisterActionError),
    map(() => STOP_LOADING)
  );

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._register$), shareReplay());

  public constructor(@Inject(REGISTER_ACTION) private readonly _registerAction$: RegisterAction) {}

  public onRegister = (): void =>
    REGISTER_FORM.invalid ? REGISTER_FORM.markAllAsTouched() : this._isLoading$.next(START_LOADING);
}
