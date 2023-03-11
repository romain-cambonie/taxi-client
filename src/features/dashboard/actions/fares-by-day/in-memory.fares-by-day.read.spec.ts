import { firstValueFrom } from 'rxjs';
import { faresInMemory, inMemoryFaresByDayAction$ } from './in-memory.fares-by-day.action';
import { FareTransfer } from '../../providers';

describe('in memory fares by day action', (): void => {
  it('should register a new account', async (): Promise<void> => {
    const fares: FareTransfer[] = await firstValueFrom(inMemoryFaresByDayAction$()());

    expect(fares).toStrictEqual(faresInMemory);
  });
});
