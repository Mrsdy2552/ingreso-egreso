import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { routes } from './app.routes';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from '../environments/environments';
import { provideStore } from '@ngrx/store';
import { appReducers } from './app.reducex';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideStore(appReducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideAuth(() => getAuth()),

    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
  ],
};
