export type PasswordErrors = {
  required?: boolean;
  minlength?: {
    requiredLength: number;
    actualLength: number;
  };
  missingSpecialChar?: { value: string };
  missingNumber?: { value: string };
  missingUppercaseChar?: { value: string };
  missingLowercaseChar?: { value: string };
  forbiddenLeadingSpace?: { value: string };
  forbiddenTrailingSpace?: { value: string };
} | null;

const requiredPasswordErrorMessage = (): string => 'Saisissez le mot de passe de votre compte';

const minlengthPasswordErrorMessage = (passwordErrors: PasswordErrors): string =>
  `Le mot de passe doit contenir ${passwordErrors?.minlength?.requiredLength} caractères au minimum`;

const missingSpecialCharPasswordErrorMessage = (): string =>
  'Le mot de passe doit contenir au moins un caractère spécial\xA0: []{}()<>.:;!?=*+-_\'"/@#%&';

const missingNumberPasswordErrorMessage = (): string => 'Le mot de passe doit contenir au moins un chiffre';

const missingUppercaseCharErrorMessage = (): string => 'Le mot de passe doit contenir au moins une lettre en majuscule';

const missingLowercaseCharErrorMessage = (): string => 'Le mot de passe doit contenir au moins une lettre en minuscule';

const forbiddenLeadingSpaceErrorMessage = (): string => 'Le mot de passe ne doit pas commencer avec un espace';

const forbiddenTrailingSpaceErrorMessage = (): string => 'Le mot de passe ne doit pas se terminer avec un espace';

const passwordErrorMessages: Map<string, (passwordErrors: PasswordErrors) => string> = new Map([
  ['required', requiredPasswordErrorMessage],
  ['minlength', minlengthPasswordErrorMessage],
  ['missingSpecialChar', missingSpecialCharPasswordErrorMessage],
  ['missingNumber', missingNumberPasswordErrorMessage],
  ['missingUppercaseChar', missingUppercaseCharErrorMessage],
  ['missingLowercaseChar', missingLowercaseCharErrorMessage],
  ['forbiddenLeadingSpace', forbiddenLeadingSpaceErrorMessage],
  ['forbiddenTrailingSpace', forbiddenTrailingSpaceErrorMessage]
]);

const onlyDefined = (passwordMessage?: string): passwordMessage is string => passwordMessage != null;

const toPasswordErrorMessage =
  (passwordErrors: PasswordErrors) =>
  (passwordErrorKey: string): string | undefined =>
    passwordErrorMessages.get(passwordErrorKey)?.(passwordErrors);

export const toPasswordErrorMessages = (passwordErrors: PasswordErrors): string[] =>
  Object.keys(passwordErrors ?? {})
    .map(toPasswordErrorMessage(passwordErrors))
    .filter(onlyDefined);
