import { PASSWORD_ERROR_MESSAGES, PasswordErrors } from './password-error-messages/password.error-message';
import { USERNAME_ERROR_MESSAGES, UsernameErrors } from './username-error-messages/username.error-message';

export * from './field-error-messages.presentation';

type FieldErrors = PasswordErrors | UsernameErrors;

export const ERROR_MESSAGES = new Map<string, Map<string, (errors: FieldErrors) => string>>([
  ['password', PASSWORD_ERROR_MESSAGES],
  ['username', USERNAME_ERROR_MESSAGES]
]);
