import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor, retryInterceptor } from '@shared/interceptors';
import { definePreset } from '@primeuix/themes';

const KartoPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#ADE1E3',
      100: '#C7D2E8',
      200: '#A5B4FC',
      300: '#818CF8',
      400: '#5BC3C7',
      500: '#4F46E5',
      600: '#4338CA',
      700: '#3730A3',
      800: '#312E81',
      950: '#1E1A78',
    },
    secondary: {
      50: '#E5C9AD',
      100: '#D8AE84',
      200: '#D1A070',
      300: '#CE9966',
      400: '#CA925B',
      500: '#C58E59',
      600: '#BF8A56',
      700: '#B38151',
      800: '#9B7046',
      950: '#65492E',
    },
    dark: {
      surface: {
        0: '#ffffff',
        50: '#ADE1E3',
        100: '#91C8CA',
        200: '#75AFB1',
        300: '#63999B',
        400: '#518385',
        500: '#3E6869',
        600: '#355B5C',
        700: '#2B4D4E',
        800: '#173132',
        900: '#122526',
        950: '#0C1919',
      },
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: KartoPreset,
      },
      ripple: true,
    }),
    provideHttpClient(withInterceptors([retryInterceptor, errorInterceptor])),
  ],
};
