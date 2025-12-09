import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponente } from './app/app.componente';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponente, appConfig)
  .catch(err => console.error(err));
