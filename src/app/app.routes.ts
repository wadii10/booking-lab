import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { MyFullCalendarComponent } from './shared/components/full-calendar/full-calendar.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';

export const routes: Routes = [
    {path:'contact-us', pathMatch:'full', component:ContactUsComponent},
    {path:'calander', pathMatch:'full', component:MyFullCalendarComponent},
    {path:'login', pathMatch:'full', component:LoginComponent},
    {path:'register', pathMatch:'full', component:RegisterComponent},
    {path:'home', pathMatch:'full', component:HomeComponent},
    {path:'', pathMatch:'full', component:HomeComponent},
    {path:'**', pathMatch:'full', redirectTo:'home'}
]
