import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'welcome', pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/start-screen/start-screen.component').then((m) => m.StartScreenComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./pages/welcome/welcome.component').then((m) => m.WelcomeComponent)
    }
];
