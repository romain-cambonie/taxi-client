import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { toUsernameErrorMessage } from '../../../presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-username-field',
  templateUrl: './username.field.component.html'
})
export class UsernameFieldComponent {
  @Input() public usernameControl?: FormControl<string>;

  @Input() public errors?: ValidationErrors | null;

  @Input() set touched(isTouched: boolean) {
    isTouched && this.usernameControl?.markAsTouched();
  }

  public toUsernameErrorMessage = (usernameErrors?: ValidationErrors | null): string =>
    usernameErrors == null ? '' : toUsernameErrorMessage(usernameErrors);
}
