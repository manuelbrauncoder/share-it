import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "shareit-b27df", appId: "1:690325998479:web:d2746071a93134bc7d19fa", storageBucket: "shareit-b27df.firebasestorage.app", apiKey: "AIzaSyDywOHc0j3D7zFby-llDhSN7qRLwFANIrQ", authDomain: "shareit-b27df.firebaseapp.com", messagingSenderId: "690325998479" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())]
};
