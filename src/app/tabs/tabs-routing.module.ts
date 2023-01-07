import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscussaoPage } from '../discussao/discussao.page';
import { DiscussoesPage } from '../discussoes/discussoes.page';
import { DuvidaPage } from '../duvida/duvida.page';
import { DuvidasPage } from '../duvidas/duvidas.page';
import { TopicoPage } from '../topico/topico.page';
import { TopicosPage } from '../topicos/topicos.page';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'topicos',
        component: TopicosPage
      },
      {
        path: 'topico',
        component: TopicoPage
      },
      {
        path: 'duvidas',
        component: DuvidasPage
      },
      {
        path: 'duvida',
        component: DuvidaPage
      },
      {
        path: 'discussoes',
        component: DiscussoesPage
      },
      {
        path: 'discussao',
        component: DiscussaoPage
      },
      {
        path: '',
        redirectTo: '/tabs/topicos',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
