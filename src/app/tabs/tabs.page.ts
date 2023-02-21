import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  admin: boolean = false;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.storage.get('isAdmin').then((admin) => {
      this.admin = admin;
    });
  }

  async desconectarContaAlert() {
    let alert = await this.alertController.create({
      header: "Tem certeza que deseja desconectar-se?",

      backdropDismiss: true,
      cssClass: "alerta-desconectar-conta",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",

          handler: () => {
            this.storage.clear().then(() => {
              // Redirecionando pra página de bem-vindo
              this.navCtrl.navigateRoot('');
            });
          }
        },
        {
          text: "Cancelar",
          cssClass: "btn-cancelar",
        }
      ]
    });

    await alert.present();
  }
}
