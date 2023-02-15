import { fieldErrorMessagesPresentation } from '../field-error-messages.presentation';
import { PASSWORD_ERROR_MESSAGES, PasswordErrors } from './password.error-message';

describe('password error messages', (): void => {
  it('should not get any password error message', (): void => {
    const errors: PasswordErrors = null;

    const errorMessage: string[] = fieldErrorMessagesPresentation(errors, PASSWORD_ERROR_MESSAGES);

    expect(errorMessage).toStrictEqual([]);
  });

  it('should get required error message', (): void => {
    const errors: PasswordErrors = { required: true };

    const errorMessage: string[] = fieldErrorMessagesPresentation(errors, PASSWORD_ERROR_MESSAGES);

    expect(errorMessage).toStrictEqual(['Saisissez le mot de passe de votre compte']);
  });

  it('should get password min length error message', (): void => {
    const errors: PasswordErrors = { minlength: { requiredLength: 8, actualLength: 3 } };

    const errorMessage: string[] = fieldErrorMessagesPresentation(errors, PASSWORD_ERROR_MESSAGES);

    expect(errorMessage).toStrictEqual(['Le mot de passe doit contenir 8 caractères au minimum']);
  });

  it('should get password required chars error messages', (): void => {
    const errors: PasswordErrors = {
      missingSpecialChar: { value: ' ££££££££ ' },
      missingNumber: { value: ' ££££££££ ' },
      missingUppercaseChar: { value: ' ££££££££ ' },
      missingLowercaseChar: { value: ' ££££££££ ' },
      forbiddenLeadingSpace: { value: ' ££££££££ ' },
      forbiddenTrailingSpace: { value: ' ££££££££ ' }
    };

    const errorMessage: string[] = fieldErrorMessagesPresentation(errors, PASSWORD_ERROR_MESSAGES);

    expect(errorMessage).toStrictEqual([
      'Le mot de passe doit contenir au moins un caractère spécial\xA0: []{}()<>.:;!?=*+-_\'"/@#%&',
      'Le mot de passe doit contenir au moins un chiffre',
      'Le mot de passe doit contenir au moins une lettre en majuscule',
      'Le mot de passe doit contenir au moins une lettre en minuscule',
      'Le mot de passe ne doit pas commencer avec un espace',
      'Le mot de passe ne doit pas se terminer avec un espace'
    ]);
  });
});
