import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ApplicationModule } from './root/modules';

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .catch((err) => console.error(err));
