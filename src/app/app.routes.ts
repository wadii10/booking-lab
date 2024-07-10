import { Routes } from '@angular/router';
import { RegisterComponent } from './shared/components/auth/register/register.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { HomeComponent } from './shared/components/home/home.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { SearchResultsComponent } from './features/user/search-results/search-results.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { CompanyFormComponent } from './features/owner/company-form/company-form.component';

export const routes: Routes = [
    {path:'login', pathMatch:'full', component:LoginComponent},
    {path:'register', pathMatch:'full', component:RegisterComponent},
    {path:'home', component:HomeComponent},
    {path:'home',
        children: [
            {
                path: 'contact-us', component: ContactUsComponent
            },
            {
                path: 'search-results', component:SearchResultsComponent
            },
            {
                path: 'profile', component:ProfileComponent
            },
            {
                path: 'partner', component:CompanyFormComponent
            }
        ]
    },
    {path:'', pathMatch:'full', redirectTo:'home'},
    {path:'**', pathMatch:'full', redirectTo:'home'}
]
