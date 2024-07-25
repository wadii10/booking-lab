import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'addStadium',
    loadComponent: () => import('./stadium-form/stadium-form.component').then( c => c.StadiumFormComponent)
  },
  {
    path: 'listStadium',
    loadComponent: () => import('./stadium-list/stadium-list.component').then( c => c.StadiumListComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
