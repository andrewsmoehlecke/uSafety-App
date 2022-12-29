import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussaoPageRoutingModule } from './discussao-routing.module';

import { DiscussaoPage } from './discussao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussaoPageRoutingModule
  ],
  declarations: [DiscussaoPage]
})
export class DiscussaoPageModule {}
