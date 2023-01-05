import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TopicoPageRoutingModule } from './topico-routing.module';

import { TopicoPage } from './topico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TopicoPageRoutingModule
  ],
  declarations: [TopicoPage]
})
export class TopicoPageModule {}
