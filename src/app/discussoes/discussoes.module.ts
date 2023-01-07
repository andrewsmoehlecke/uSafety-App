import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiscussoesPageRoutingModule } from './discussoes-routing.module';

import { DiscussoesPage } from './discussoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiscussoesPageRoutingModule
  ],
})
export class DiscussoesPageModule { }
