import { isPhone } from './is-phone';

describe('phone validator', (): void => {
  it('should not validate empty string as phone number', (): void => {
    const isValid: boolean = isPhone('');

    expect(isValid).toBe(false);
  });

  it('should not validate as phone number with missing digit', (): void => {
    const isValid: boolean = isPhone('061286458');

    expect(isValid).toBe(false);
  });

  it('should validate 0612864587 as phone number', (): void => {
    const isValid: boolean = isPhone('0612864587');

    expect(isValid).toBe(true);
  });

  it('should validate phone number with space separators', (): void => {
    const isValid: boolean = isPhone('06 12 86 45 87');

    expect(isValid).toBe(true);
  });

  it('should validate phone number with dot separators', (): void => {
    const isValid: boolean = isPhone('06.12.86.45.87');

    expect(isValid).toBe(true);
  });

  it('should validate phone number with international + format', (): void => {
    const isValid: boolean = isPhone('+33612864587');

    expect(isValid).toBe(true);
  });

  it('should validate phone number with international + format and optional 0', (): void => {
    const isValid: boolean = isPhone('+33(0)612864587');

    expect(isValid).toBe(true);
  });

  it('should validate phone number with international 00 format', (): void => {
    const isValid: boolean = isPhone('0033612864587');

    expect(isValid).toBe(true);
  });
});
