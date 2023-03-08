import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FareListItemPresentation } from '../../presenters/fare-list-item.presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fare-list',
  templateUrl: './fare-list.component.html'
})
export class FareListComponent {
  @Input() public fares: FareListItemPresentation[] = [];

  public constructor(public readonly route: ActivatedRoute) {}

  public trackByFareId(_: number, fare: FareListItemPresentation) {
    return fare.id;
  }
}
