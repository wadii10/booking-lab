import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';

export const routes: Routes = [
    {path:'login', pathMatch:'full', component:LoginComponent},
    {path:'register', pathMatch:'full', component:RegisterComponent},
    {path:'', pathMatch:'full', component:RegisterComponent},
    {path:'**', pathMatch:'full', redirectTo:'register'}
]
