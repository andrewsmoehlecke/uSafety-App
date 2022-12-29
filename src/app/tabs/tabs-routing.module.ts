import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
