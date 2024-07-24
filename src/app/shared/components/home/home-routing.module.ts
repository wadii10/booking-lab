import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [   
  {
    path:'',
    loadComponent: () => import('../home-body/home-body.component').then( c => c.HomeBodyComponent)
  },
  {
    path:'contact-us',
    loadComponent: () => import('../contact-us/contact-us.component').then( c => c.ContactUsComponent)
   },
   {
    path:'become-partner',
    loadComponent: () => import('../../../features/owner/company-form/company-form.component').then(c => c.CompanyFormComponent)
   },
   {
    path: 'search-results',
    loadComponent: () => import('../../../features/user/search-results/search-results.component').then( c => c.SearchResultsComponent)
   },
   {
    path: 'profile/:id',
    loadComponent: () => import('../profile/profile.component').then( c => c.ProfileComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
