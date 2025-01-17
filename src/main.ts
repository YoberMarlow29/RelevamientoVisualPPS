import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { getStorage, provideStorage } from '@angular/fire/storage';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({"projectId":"pruebapp-yober","appId":"1:620395305758:web:69af02ba6fe3787409c70f","storageBucket":"pruebapp-yober.appspot.com","apiKey":"AIzaSyCnOZQqVqZSS7V_zMPOtwlhnElm7FJs7JY","authDomain":"pruebapp-yober.firebaseapp.com","messagingSenderId":"620395305758","measurementId":"G-7V1VWX8WNM"})),provideStorage(() => getStorage()), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage()),
    importProvidersFrom(AngularFireModule.initializeApp({
      apiKey: "AIzaSyCnOZQqVqZSS7V_zMPOtwlhnElm7FJs7JY",
      authDomain: "pruebapp-yober.firebaseapp.com",
      projectId: "pruebapp-yober",
      storageBucket: "pruebapp-yober.appspot.com",
      messagingSenderId: "620395305758",
      appId: "1:620395305758:web:69af02ba6fe3787409c70f",
      measurementId: "G-7V1VWX8WNM"
    })),

  ],
});
