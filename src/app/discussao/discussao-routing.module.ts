import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiscussaoPage } from './discussao.page';

const routes: Routes = [
  {
    path: '',
    component: DiscussaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscussaoPageRoutingModule {}
