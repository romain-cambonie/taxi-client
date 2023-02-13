import { EMPTY, Observable } from 'rxjs';
import { ACCOUNT_ALREADY_EXIST_ERROR_NAME } from '../../errors';

export type RegisterFormValues = {
  username: string;
  password: string;
  terms: boolean;
};

export type FormattedRegisterError = { field?: string; errors: Record<string, unknown> };

export const START_LOADING = true as const;
export const STOP_LOADING = false as const;

export const whileLoading =
  <T>(action$: () => Observable<T>) =>
  (isLoading: boolean): Observable<T> =>
    isLoading ? action$() : EMPTY;

const registerErrorFormatMap: Map<string, (error: Error) => FormattedRegisterError> = new Map([
  [
    ACCOUNT_ALREADY_EXIST_ERROR_NAME,
    (error: Error) => ({
      field: 'username',
      errors: {
        [ACCOUNT_ALREADY_EXIST_ERROR_NAME]: error
      }
    })
  ]
]);

export const formatRegisterError = (error: Error): FormattedRegisterError =>
  registerErrorFormatMap.get(error.name)?.(error) ?? { errors: { unknown: true } };
