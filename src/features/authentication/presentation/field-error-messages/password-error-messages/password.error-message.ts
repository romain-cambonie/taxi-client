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

export const PASSWORD_ERROR_MESSAGES: Map<string, (errors: PasswordErrors) => string> = new Map([
  ['required', (): string => 'Saisissez le mot de passe de votre compte'],
  [
    'minlength',
    (passwordErrors: PasswordErrors): string =>
      `Le mot de passe doit contenir ${passwordErrors?.minlength?.requiredLength} caractères au minimum`
  ],
  [
    'missingSpecialChar',
    (): string => 'Le mot de passe doit contenir au moins un caractère spécial\xA0: []{}()<>.:;!?=*+-_\'"/@#%&'
  ],
  ['missingNumber', (): string => 'Le mot de passe doit contenir au moins un chiffre'],
  ['missingUppercaseChar', (): string => 'Le mot de passe doit contenir au moins une lettre en majuscule'],
  ['missingLowercaseChar', (): string => 'Le mot de passe doit contenir au moins une lettre en minuscule'],
  ['forbiddenLeadingSpace', (): string => 'Le mot de passe ne doit pas commencer avec un espace'],
  ['forbiddenTrailingSpace', (): string => 'Le mot de passe ne doit pas se terminer avec un espace']
]);
