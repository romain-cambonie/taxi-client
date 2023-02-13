import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterFormValues } from '@features/authentication/pages/register/register.presenter';
import { passwordValidator, usernameValidator } from '@features/authentication/validators';

export const REGISTER_FORM: FormGroup<Record<keyof RegisterFormValues, FormControl>> = new FormGroup<
  Record<keyof RegisterFormValues, FormControl>
>({
  username: new FormControl<RegisterFormValues['username']>('', [Validators.required, usernameValidator]),
  password: new FormControl<RegisterFormValues['password']>('', [
    Validators.required,
    Validators.minLength(8),
    passwordValidator
  ]),
  terms: new FormControl<RegisterFormValues['terms']>(false, [Validators.requiredTrue])
});

export const setRegisterErrorToForm = (handledError: { field?: string; errors: Record<string, unknown> }): void => {
  handledError.field
    ? REGISTER_FORM.get(handledError.field)?.setErrors(handledError.errors)
    : REGISTER_FORM.setErrors(handledError.errors);
};
