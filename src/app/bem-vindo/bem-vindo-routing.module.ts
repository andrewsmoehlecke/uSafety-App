import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroPage } from '../cadastro/cadastro.page';

import { BemVindoPage } from './bem-vindo.page';

const routes: Routes = [
  {
    path: '',
    component: BemVindoPage
  },
  {
    path: 'cadastro',
    component: CadastroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BemVindoPageRoutingModule { }
