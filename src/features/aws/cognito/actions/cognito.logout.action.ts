import { Session } from '@features/authentication';
import {
  ACCESS_TOKEN_STORAGE_KEY,
  EXPIRES_IN_STORAGE_KEY,
  ID_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from '@features/aws';

export const cognitoLogoutAction = (session: Session) => (): void => {
  [ACCESS_TOKEN_STORAGE_KEY, ID_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY, EXPIRES_IN_STORAGE_KEY].forEach((key: string) =>
    localStorage.removeItem(key)
  );
  session.isLoggedIn = false;
};
