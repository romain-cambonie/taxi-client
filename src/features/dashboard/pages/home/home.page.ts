import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FareListItemPresentation, toFareListItemsPresentation } from '../../presenters/fare-list-item.presentation';
import { FARES_BY_DAY_READ, FaresByDayAction, FareTransfer } from '../../providers';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html'
})
export class HomePage {
  public constructor(@Inject(FARES_BY_DAY_READ) private readonly _faresByDayAction$: FaresByDayAction<FareTransfer[]>) {}

  public readonly fares$: Observable<FareListItemPresentation[]> = this._faresByDayAction$().pipe(
    map(toFareListItemsPresentation)
  );
}
