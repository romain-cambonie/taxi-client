import { INVALID_CODE_ERROR_NAME } from '../../errors';

export type FormattedActivateError = { field?: string; errors: Record<string, unknown> };

const activateErrorFormatMap: Map<string, (error: Error) => FormattedActivateError> = new Map([
  [
    INVALID_CODE_ERROR_NAME,
    (error: Error) => ({
      field: 'code',
      errors: {
        [INVALID_CODE_ERROR_NAME]: error
      }
    })
  ]
]);

export const formatActivateError = (error: Error): FormattedActivateError =>
  activateErrorFormatMap.get(error.name)?.(error) ?? { errors: { unknown: true } };
