import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TopicoPage } from '../topico/topico.page';

import { TopicosPage } from './topicos.page';

const routes: Routes = [
  {
    path: '',
    component: TopicosPage,
    children: [
      {
        path: 'topico',
        component: TopicosPage
      },
      {
        path: '',
        redirectTo: '/tabs/topicos/topico',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicosPageRoutingModule { }
