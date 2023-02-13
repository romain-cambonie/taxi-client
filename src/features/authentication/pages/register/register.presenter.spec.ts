import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { ACCOUNT_ALREADY_EXIST_ERROR_NAME, AccountAlreadyExistError } from '../../errors';
import { formatRegisterError, FormattedRegisterError, START_LOADING, STOP_LOADING, whileLoading } from './register.presenter';

describe('register presenter', (): void => {
  it('should execute action while loading', async (): Promise<void> => {
    const action$: BehaviorSubject<string> = new BehaviorSubject<string>('execute action');

    const actionWhileLoading$: Observable<string> = whileLoading(() => action$.asObservable())(START_LOADING);

    const actionResult: string = await firstValueFrom(actionWhileLoading$);

    expect(actionResult).toBe('execute action');
  });

  it('should not execute action while not loading', async (): Promise<void> => {
    const action$: BehaviorSubject<string> = new BehaviorSubject<string>('execute action');

    const actionWhileLoading$: Observable<string> = whileLoading(() => action$.asObservable())(STOP_LOADING);

    await expect(firstValueFrom(actionWhileLoading$)).rejects.toEqual(new Error('no elements in sequence'));
  });

  it('should format account already exist error', (): void => {
    const error: AccountAlreadyExistError = new AccountAlreadyExistError('0657893254');

    const formattedError: FormattedRegisterError = formatRegisterError(error);

    expect(formattedError).toStrictEqual({
      field: 'username',
      errors: {
        [ACCOUNT_ALREADY_EXIST_ERROR_NAME]: error
      }
    });
  });

  it('should format unknown error', (): void => {
    const error: Error = new Error();

    const formattedError: FormattedRegisterError = formatRegisterError(error);

    expect(formattedError).toStrictEqual({
      errors: {
        unknown: true
      }
    });
  });
});
