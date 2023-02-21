import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarAcessoPageRoutingModule } from './recuperar-acesso-routing.module';

import { RecuperarAcessoPage } from './recuperar-acesso.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RecuperarAcessoPageRoutingModule
  ],
  declarations: [RecuperarAcessoPage]
})
export class RecuperarAcessoPageModule { }
