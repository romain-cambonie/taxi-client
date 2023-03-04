export const UNKNOWN_ACCOUNT_ERROR_NAME: string = 'unknownAccountError';

export class UnknownAccountError extends Error {
  public override readonly name: string = UNKNOWN_ACCOUNT_ERROR_NAME;

  public constructor(public readonly username: string) {
    super(`Unknown account ${username}`);
  }
}
