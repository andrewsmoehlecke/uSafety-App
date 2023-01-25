import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TopicoDto } from '../services/api-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-duvida',
  templateUrl: './duvida.page.html',
  styleUrls: ['./duvida.page.scss'],
})
export class DuvidaPage implements OnInit {

  duvida: TopicoDto;

  podeExcluir: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: Storage,
  ) {
    this.duvida = JSON.parse(this.route.snapshot.paramMap.get('duvida') || '{}');
    this.verificarSePodeExcluir();
  }

  ngOnInit() { }

  excluirDuvidaAlert() {
    this.alertController.create({
      header: "Tem certeza que deseja excluir esta dúvida?",
      message: "Esta ação não pode ser desfeita.",
      backdropDismiss: true,
      cssClass: "alerta-excluir-duvida",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",
          handler: () => {
          }
        },
        {
          text: "Cancelar",
          cssClass: "btn-cancelar",
        }
      ]
    }).then(alert => {
      alert.present();
    });


  }

  verificarSePodeExcluir() {
    console.log("Verificando se pode excluir...")
    this.storage.get('username').then((username: string) => {
      if (username == this.duvida.autor.username) {
        this.podeExcluir = true;
      }
    });

    this.storage.get('admin').then((admin: boolean) => {
      if (admin) {
        this.podeExcluir = true;
      }
    });
  }
}
