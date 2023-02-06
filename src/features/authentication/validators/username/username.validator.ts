import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { isPhone } from '../phone/is-phone';

export const usernameValidator = (control: AbstractControl): ValidationErrors | null =>
  isPhone(control.value) || !Validators.email(control) ? null : { invalidUsername: { value: control.value } };
