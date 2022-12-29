import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TopicosPage } from './topicos.page';

const routes: Routes = [
  {
    path: '',
    component: TopicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TopicosPageRoutingModule {}
