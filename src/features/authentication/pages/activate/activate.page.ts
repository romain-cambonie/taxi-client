import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, from, map, mergeWith, Observable, Subject, switchMap, tap } from 'rxjs';
import { START_LOADING, STOP_LOADING, toInternationalFormat, whileLoading } from '../../presentation';
import { ACTIVATE_ACTION, ActivateAction, REDIRECT_ROUTES_PERSISTENCE, RedirectRoutesKeys } from '../../providers';
import { ACTIVATE_FORM, ActivateFormValues, setActivateErrorToForm } from './activate.form';
import { formatActivateError } from './activate.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './activate.page.html'
})
export class ActivatePage {
  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  public activateForm: FormGroup<Record<keyof ActivateFormValues, FormControl>> = ACTIVATE_FORM;

  public username: FormControl<ActivateFormValues['username']> = this.activateForm.controls.username;

  public code: FormControl<ActivateFormValues['code']> = this.activateForm.controls.code;

  public readonly defaultUsername: string | null = this._route.snapshot.queryParamMap.get('username');

  public readonly defaultCode: string | null = this._route.snapshot.queryParamMap.get('code');

  private handleActivateActionError = (error: Error, caught: Observable<object>): Observable<object> => {
    setActivateErrorToForm(formatActivateError(error));
    this._isLoading$.next(STOP_LOADING);
    return caught;
  };

  private readonly _activate$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(whileLoading(() => this._activateAction$(toInternationalFormat(this.username.value), this.code.value))),
    catchError(this.handleActivateActionError),
    tap(() => from(this._router.navigate([this._toRoutes.get('activate')]))),
    tap(() => ACTIVATE_FORM.reset()),
    map(() => STOP_LOADING)
  );

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._activate$));

  public constructor(
    @Inject(ACTIVATE_ACTION) private readonly _activateAction$: ActivateAction,
    @Inject(REDIRECT_ROUTES_PERSISTENCE) private readonly _toRoutes: Map<RedirectRoutesKeys, string>,
    private readonly _route: ActivatedRoute,
    private readonly _router: Router
  ) {
    this.defaultUsername && this.username.setValue(this.defaultUsername);
    this.defaultCode && this.code.setValue(this.defaultCode);
  }

  public onActivate = (): void => {
    ACTIVATE_FORM.markAllAsTouched();
    ACTIVATE_FORM.valid && this._isLoading$.next(START_LOADING);
  };
}
