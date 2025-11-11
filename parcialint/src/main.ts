import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponente } from './app/app.componente';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponente, {
  providers: [provideRouter(routes)]
} );
