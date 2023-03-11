import { faresByDayFactoryProvider } from '../../features/dashboard';
import { inMemoryFaresByDayAction$ } from '../../features/dashboard/actions';

export const DASHBOARD_PROVIDERS = [faresByDayFactoryProvider(inMemoryFaresByDayAction$, [])];
