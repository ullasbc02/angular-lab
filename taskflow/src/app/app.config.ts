import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { authInterceptor } from '../app/interceptors/auth-interceptor';
import { environment } from '../environments/environment';
import { TaskEffects } from './tasks/store/task.effects';
import { taskReducer } from './tasks/store/task.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ tasks: taskReducer }),
    provideEffects([TaskEffects])
  ]
};