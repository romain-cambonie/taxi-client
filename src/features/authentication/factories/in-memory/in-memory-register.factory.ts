import { delay, Observable, of, tap } from 'rxjs';

export const inMemoryRegisterFactory =
  () =>
  (username: string, password: string): Observable<void> =>
    of(void 0).pipe(
      delay(1000),
      tap(() => {
        console.log(`Register ${username} with password ${password}`);
      })
    );
