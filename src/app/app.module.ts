import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriarTopicoPage } from './criar-topico/criar-topico.page';
import { DiscussaoPage } from './discussao/discussao.page';
import { DiscussoesPage } from './discussoes/discussoes.page';
import { DuvidaPage } from './duvida/duvida.page';
import { DuvidasPage } from './duvidas/duvidas.page';
import { InterceptorProvider } from './interceptor-ts/interceptor-ts';
import { MeuPerfilPage } from './meu-perfil/meu-perfil.page';
import { Settings } from './services/settings';
import { TabsPage } from './tabs/tabs.page';
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
    CriarTopicoPage,
    MeuPerfilPage,
    TabsPage,
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    Storage,
    ImagePicker,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
