import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';

export function tokenGetter() {
  return localStorage.getItem('auth_token');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEventPlugins(),
    provideEventPlugins(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ['localhost:8080'],
          disallowedRoutes: ['http://localhost:8080/auth/login'],
        },
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
};
