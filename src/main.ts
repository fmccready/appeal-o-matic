import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { enableProdMode } from '@angular/core';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { APP_ROUTER_PROVIDERS, locStrat } from './app/app.routes';
import { AppComponent, environment } from './app/';

import 'rxjs/add/operator/map';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  APP_ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  locStrat,
  disableDeprecatedForms(),
  provideForms()
]).catch(err => console.error(err));
