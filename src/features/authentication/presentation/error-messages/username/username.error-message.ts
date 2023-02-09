export type UsernameErrors = {
  required?: boolean;
  invalidUsername?: { value: string };
} | null;

const noErrorMessage = (): '' => '';

const requiredUsernameErrorMessage = (): string => 'Saisissez votre adresse électronique ou numéro de téléphone portable';

const invalidUsernameErrorMessage = (usernameErrors: UsernameErrors): string =>
  `${usernameErrors?.invalidUsername?.value} n'est pas une adresse électronique ou un numéro de téléphone valide`;

const usernameErrorMessages: Map<string, (usernameErrors: UsernameErrors) => string> = new Map([
  ['required', requiredUsernameErrorMessage],
  ['invalidUsername', invalidUsernameErrorMessage]
]);

const errorMessageIfDefined = <T>(
  errorMessages: Map<string, (errors: T) => string>,
  errorKey?: string
): ((errors: T) => string) => (errorKey == null ? noErrorMessage : errorMessages.get(errorKey) ?? noErrorMessage);

export const toUsernameErrorMessage = (usernameErrors: UsernameErrors): string =>
  errorMessageIfDefined(usernameErrorMessages, Object.keys(usernameErrors ?? {})[0])(usernameErrors);
