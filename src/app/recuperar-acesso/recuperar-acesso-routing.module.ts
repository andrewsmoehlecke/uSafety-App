import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarAcessoPage } from './recuperar-acesso.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarAcessoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarAcessoPageRoutingModule {}
