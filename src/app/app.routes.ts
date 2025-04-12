/**
 * Use authGuard on Routes, that should be protected
 * Only a logged in User can use them
 */

import { Routes } from '@angular/router';
import { authGuard } from "./auth.guard";

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
        path: 'start',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/start-screen/start-screen.component').then((m) => m.StartScreenComponent)
    },
    {
        path: 'welcome',
        loadComponent: () => import('./pages/welcome/welcome.component').then((m) => m.WelcomeComponent)
    }
];
