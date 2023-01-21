import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CriarTopicoPage } from './criar-topico.page';

const routes: Routes = [
  {
    path: '',
    component: CriarTopicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CriarTopicoPageRoutingModule {}
