import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FareListItemPresentation } from '../../presenters/fare-list-item.presentation';
import { FareListPresenter, toFareListItemsPresentation } from '../../presenters/fare-list-item.presenter';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.page.html'
})
export class HomePage {
  // TODO Remove
  private _fareListPresenter: FareListPresenter = new FareListPresenter();

  public fares$: Observable<FareListItemPresentation[]> = this._fareListPresenter
    .faresByDay$()
    .pipe(map(toFareListItemsPresentation));
}
