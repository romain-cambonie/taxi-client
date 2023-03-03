const COGNITO_STORAGE_KEY: string = 'aws.cognito';
export const ACCESS_TOKEN_STORAGE_KEY: string = `${COGNITO_STORAGE_KEY}.access-token`;
export const ID_TOKEN_STORAGE_KEY: string = `${COGNITO_STORAGE_KEY}.id-token`;
export const REFRESH_TOKEN_STORAGE_KEY: string = `${COGNITO_STORAGE_KEY}.refresh-token`;
export const EXPIRES_IN_STORAGE_KEY: string = `${COGNITO_STORAGE_KEY}.expires-in`;

export type CognitoAuthentication = {
  AccessToken: string;
  IdToken: string;
  RefreshToken: string;
  ExpiresIn: number;
  TokenType: 'Bearer';
};

const MILLISECONDS = 1000 as const;

const getPayload = (token: string): string | undefined => token.split('.').at(1);

const decodeTokenPart = (tokenPayload: string): { exp: number } => JSON.parse(atob(tokenPayload));

const tokenExpirationTime = (payload?: string): number => (payload ? decodeTokenPart(payload).exp * MILLISECONDS : 0);

export const isCognitoTokenExpired = (token: string, now: Date): boolean =>
  now.getTime() > tokenExpirationTime(getPayload(token));

export const isCognitoAuthenticationActive = () =>
  ((idToken: string | null): boolean => (idToken ? !isCognitoTokenExpired(idToken, new Date()) : false))(
    localStorage.getItem(ID_TOKEN_STORAGE_KEY)
  );
