import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { HomeAdminComponent } from './features/admin/home-admin/home-admin.component';
import { HomeOwnerComponent } from './features/owner/home-owner/home-owner.component';
import { authGuard } from './shared/services/auth/auth.guard';

export const routes: Routes = [
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'register', pathMatch: 'full', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./shared/components/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/admin/admin.module').then((m) => m.AdminModule),
        canActivate: [authGuard],
        data: { expectedRole: 'ADMIN' },
      },
    ],
  },
  {
    path: 'owner',
    component: HomeOwnerComponent,
    loadChildren: () =>
      import('./features/owner/owner.module').then((m) => m.OwnerModule),
    canActivate: [authGuard],
    data: { expectedRole: 'OWNER' },
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
