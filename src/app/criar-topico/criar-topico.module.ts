import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CriarTopicoPageRoutingModule } from './criar-topico-routing.module';

import { CriarTopicoPage } from './criar-topico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CriarTopicoPageRoutingModule,
  ],
  declarations: [CriarTopicoPage]
})
export class CriarTopicoPageModule { }
