import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-bem-vindo',
  templateUrl: './bem-vindo.page.html',
  styleUrls: ['./bem-vindo.page.scss'],
})
export class BemVindoPage implements OnInit {

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.verificarSeEstaLogado();
  }

  verificarSeEstaLogado() {
    this.storage.get('token').then((token: string) => {
      if (token != null) {
        this.navCtrl.navigateForward("/tabs/topicos");
      }
    });
  }
}
