export const LIMIT_EXCEEDED_EXIST_ERROR_NAME: string = 'limitExceededError';

export class LimitExceededError extends Error {
  public override readonly name: string = LIMIT_EXCEEDED_EXIST_ERROR_NAME;

  public constructor() {
    super('Attempt limit exceeded, please try again after some time');
  }
}
