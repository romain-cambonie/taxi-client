import { toUsernameErrorMessage, UsernameErrors } from './username.error-message';

describe('register presenter', (): void => {
  it('should not get any username error message', (): void => {
    const errors: UsernameErrors = null;

    const errorMessage: string = toUsernameErrorMessage(errors);

    expect(errorMessage).toBe('');
  });

  it('should get required username error message', (): void => {
    const errors: UsernameErrors = { required: true };

    const errorMessage: string = toUsernameErrorMessage(errors);

    expect(errorMessage).toBe('Saisissez votre adresse électronique ou numéro de téléphone portable');
  });

  it('should get invalid username error message', (): void => {
    const errors: UsernameErrors = { invalidUsername: { value: '06213697' } };

    const errorMessage: string = toUsernameErrorMessage(errors);

    expect(errorMessage).toBe("06213697 n'est pas une adresse électronique ou un numéro de téléphone valide");
  });
});