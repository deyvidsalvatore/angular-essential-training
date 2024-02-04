import { InjectionToken } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const FETCH_ENABLED = new InjectionToken<boolean>('Fetch Enabled');

export const appConfig = {
  provideHttpClient: provideHttpClient(withFetch()),
  fetchEnabled: true,
};
