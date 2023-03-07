import { shouldForwardBearerToken } from './forward-bearer-token.interceptor';

describe('bearer token forward on /api', (): void => {
  const matchApiRegex: RegExp = /\/api/;
  it('should not forward bearer token if token is null', (): void => {
    expect(shouldForwardBearerToken(matchApiRegex)(null, 'https://google.com/api/lol')).toBeFalsy();
  });

  it('should not forward bearer token if url does not include /api', (): void => {
    expect(shouldForwardBearerToken(matchApiRegex)('plop', 'https://google.com/lol')).toBeFalsy();
  });

  it('should forward bearer token if regex match and token is a string', (): void => {
    expect(shouldForwardBearerToken(/\/lol/)('', 'https://google.com/lol/fares/1243')).toBeFalsy();
  });
});
