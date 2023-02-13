import { ACCOUNT_ALREADY_EXIST_ERROR_NAME, AccountAlreadyExistError } from '../../../errors';

export type UsernameErrors = {
  required?: boolean;
  invalidUsername?: { value: string };
  accountAlreadyExistError?: AccountAlreadyExistError;
} | null;

const noErrorMessage = (): '' => '';

const requiredUsernameErrorMessage = (): string => 'Saisissez votre adresse électronique ou numéro de téléphone portable';

const invalidUsernameErrorMessage = (usernameErrors: UsernameErrors): string =>
  `${usernameErrors?.invalidUsername?.value} n'est pas une adresse électronique ou un numéro de téléphone valide`;

const accountAlreadyExistErrorMessage = (usernameErrors: UsernameErrors): string =>
  `Il existe déjà un compte associé à l'identifiant ${usernameErrors?.accountAlreadyExistError?.username}`;

const usernameErrorMessages: Map<string, (usernameErrors: UsernameErrors) => string> = new Map([
  ['required', requiredUsernameErrorMessage],
  ['invalidUsername', invalidUsernameErrorMessage],
  [ACCOUNT_ALREADY_EXIST_ERROR_NAME, accountAlreadyExistErrorMessage]
]);

const errorMessageIfDefined = <T>(
  errorMessages: Map<string, (errors: T) => string>,
  errorKey?: string
): ((errors: T) => string) => (errorKey == null ? noErrorMessage : errorMessages.get(errorKey) ?? noErrorMessage);

export const toUsernameErrorMessage = (usernameErrors: UsernameErrors): string =>
  errorMessageIfDefined(usernameErrorMessages, Object.keys(usernameErrors ?? {})[0])(usernameErrors);
