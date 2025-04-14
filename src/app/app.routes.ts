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
    },
    {
        path: 'app-info',
        loadComponent: () => import('./pages/app-info/app-info.component').then((m) => m.AppInfoComponent)
    },
    {
        path: 'imprint',
        loadComponent: () => import('./pages/imprint/imprint.component').then((m) => m.ImprintComponent)
    },
    {
        path: 'create-group',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/create-group/create-group.component').then((m) => m.CreateGroupComponent)
    },
    {
        path: 'group/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/group/group.component').then((m) => m.GroupComponent)
    },

    // wildcard route
    {
        path: '**', redirectTo: 'not-found', pathMatch: 'full'
    },
    {
        path: 'not-found',
        loadComponent: () => import('./pages/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent)
    },
];
