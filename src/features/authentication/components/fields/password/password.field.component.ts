import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';
import { toPasswordErrorMessages } from '../../../presentation';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-password-field',
  templateUrl: './password.field.component.html'
})
export class PasswordFieldComponent {
  @Input() public passwordControl!: FormControl<string>;

  @Input() public errors?: ValidationErrors | null;

  @Input() set touched(isTouched: boolean) {
    isTouched && this.passwordControl?.markAsTouched();
  }

  public toPasswordErrorMessage = (passwordErrors?: ValidationErrors | null): string[] =>
    passwordErrors == null ? [] : toPasswordErrorMessages(passwordErrors);
}
