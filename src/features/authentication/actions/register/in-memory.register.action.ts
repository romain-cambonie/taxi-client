import { delay, Observable, of, tap, throwError } from 'rxjs';
import { Account } from '../../providers';
import { AccountAlreadyExistError } from '../../errors';

const alreadyRegistered = (accounts: Account[], username: string) =>
  accounts.some((account: Account) => account.username === username);

export const inMemoryRegisterAction =
  (accounts: Account[]) =>
  (username: string, password: string): Observable<void> =>
    alreadyRegistered(accounts, username)
      ? throwError(() => new AccountAlreadyExistError(username))
      : of(void 0).pipe(
          delay(1000),
          tap(() => accounts.push({ username, password }))
        );