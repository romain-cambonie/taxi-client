import { INVALID_CODE_ERROR_NAME, InvalidCodeError } from '../../errors';
import { formatActivateError, FormattedActivateError } from './activate.presenter';

describe('activate presenter', (): void => {
  it('should format invalid code error', (): void => {
    const error: Error = new InvalidCodeError('73586');

    const formattedError: FormattedActivateError = formatActivateError(error);

    expect(formattedError).toStrictEqual({
      field: 'code',
      errors: {
        [INVALID_CODE_ERROR_NAME]: error
      }
    });
  });

  it('should format unknown error', (): void => {
    const error: Error = new Error();

    const formattedError: FormattedActivateError = formatActivateError(error);

    expect(formattedError).toStrictEqual({
      errors: {
        unknown: true
      }
    });
  });
});
