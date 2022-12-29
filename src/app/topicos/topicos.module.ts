import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicosPageRoutingModule } from './topicos-routing.module';

import { TopicosPage } from './topicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicosPageRoutingModule
  ],
  declarations: [TopicosPage]
})
export class TopicosPageModule {}
