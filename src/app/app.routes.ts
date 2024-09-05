import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./components/splash/splash.component').then( m => m.SplashComponent)
  },
  {
    path: 'cosaslindas',
    loadComponent: () => import('./pages/cosas-lindas/cosas-lindas.page').then( m => m.CosasLindasPage)
  },
  {
    path: 'cosasfeas',
    loadComponent: () => import('./pages/cosas-feas/cosas-feas.page').then( m => m.CosasFeasPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'graficos',
    loadComponent: () => import('./pages/graficos/graficos.page').then( m => m.GraficosPage)
  }
];
