import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
  ) { }

  desconectarConta() {
    this.storage.clear().then(() => {
      console.debug('Storage limpo');
      // Redirecionando pra página de bem-vindo
      this.navCtrl.navigateRoot('');
    });
  }
}
