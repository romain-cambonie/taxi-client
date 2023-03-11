import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { map, mergeWith, Observable, Subject, switchMap } from 'rxjs';
import { FareListItemPresentation, toFareListItemsPresentation } from '../../presenters/fare-list-item.presentation';
import { FARES_BY_DAY_ACTION, FaresByDayAction, FareTransfer } from '../../providers';
import { STOP_LOADING, whileLoading } from '../../../authentication/presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html'
})
export class HomePage {
  private readonly _isLoading$: Subject<boolean> = new Subject<boolean>();

  private readonly _faresByDay$: Observable<boolean> = this._isLoading$.pipe(
    switchMap(whileLoading(() => this._faresByDayAction$())),
    map(toFareListItemsPresentation),
    //catchError(this.handleRegisterActionError),
    map(() => STOP_LOADING)
  );

  public constructor(@Inject(FARES_BY_DAY_ACTION) private readonly _faresByDayAction$: FaresByDayAction<FareTransfer[]>) {}

  public readonly isLoading$: Observable<boolean> = this._isLoading$.pipe(mergeWith(this._faresByDay$));

  public readonly fares$: Observable<FareListItemPresentation[]> = this._faresByDayAction$().pipe(
    map(toFareListItemsPresentation)
  );
}
