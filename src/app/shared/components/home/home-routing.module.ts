import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/auth/auth.guard';

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
    path: 'search',
    loadComponent: () => import('../../../features/user/search-results/search-results.component').then( c => c.SearchResultsComponent)
   },
   {
    path: 'user/profile',
    loadComponent: () =>
      import('../../../features/user/profile/profile.component').then((c) => c.ProfileComponent),
    canActivate: [authGuard],
    data: { expectedRole: 'USER' }
  },
  {
    path: 'user/reservationList',
    loadComponent: () => import('../../../features/user/list-reservation/list-reservation.component').then( c => c.ListReservationComponent),
    canActivate:[authGuard],
    data: { expectedRole: 'USER'}
  },
  {
    path: 'search-detail/:id',
    loadComponent: () => import('../../../features/user/search-detail/search-detail.component').then( c => c.SearchDetailComponent)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
