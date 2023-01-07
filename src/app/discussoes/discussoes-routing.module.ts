import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscussoesPage } from './discussoes.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussoesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussoesPageRoutingModule {}
