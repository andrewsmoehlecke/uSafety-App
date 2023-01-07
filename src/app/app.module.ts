import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Storage } from '@ionic/storage';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiscussaoPage } from './discussao/discussao.page';
import { DiscussoesPage } from './discussoes/discussoes.page';
import { DuvidaPage } from './duvida/duvida.page';
import { DuvidasPage } from './duvidas/duvidas.page';
import { InterceptorProvider } from './interceptor-ts/interceptor-ts';
import { Settings } from './services/settings';
import { TopicoPage } from './topico/topico.page';
import { TopicosPage } from './topicos/topicos.page';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '3',
    option4: 'Hello'
  });
}
@NgModule({
  declarations: [
    AppComponent,
    TopicosPage,
    TopicoPage,
    DuvidasPage,
    DuvidaPage,
    DiscussaoPage,
    DiscussoesPage,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    Storage
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
