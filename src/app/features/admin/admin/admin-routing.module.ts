import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'activity',
    loadComponent: () => import('../activity/activity/activity.component').then( c => c.ActivityComponent)
  },
  {
    path: 'state',
    loadComponent: () => import('../State/state/state.component').then( c => c.StateComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
