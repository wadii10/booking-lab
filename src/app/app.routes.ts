import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { HomeAdminComponent } from './features/admin/home-admin/home-admin.component';

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
    children:[
      {
        path:'',
        loadChildren: () => import('./features/admin/admin/admin.module').then( m => m.AdminModule)
      }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
