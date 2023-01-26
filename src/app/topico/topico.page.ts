import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.page.html',
  styleUrls: ['./topico.page.scss'],
})
export class TopicoPage implements OnInit {

  topico: TopicoDto;

  podeExcluir: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiServiceService,
    private storage: Storage,
    private alertController: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.topico = JSON.parse(this.route.snapshot.paramMap.get('topico') || '{}');
    this.verificarSePodeExcluir();
  }

  ngOnInit() { }

  excluirTopicoAlert() {
    this.alertController.create({
      header: "Tem certeza que deseja excluir esta discussão?",
      message: "Esta ação não pode ser desfeita.",
      backdropDismiss: true,
      cssClass: "alerta-excluir-topico",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",
          handler: () => {
            this.adminExcluirTopico(this.topico.id)
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
    this.storage.get('username').then((username: string) => {
      if (username == this.topico.autor.username) {
        this.podeExcluir = true;
      }
    });

    this.storage.get('admin').then((admin: boolean) => {
      if (admin) {
        this.podeExcluir = true;
      }
    });
  }

  adminExcluirTopico(id: number) {
    this.api.adminExcluirTopico(id).subscribe({
      next: (next) => {
        this.toastTopicoExcluido("Tópico excluido com sucesso!");
        this.navCtrl.navigateBack("/tabs/topicos");
      },
      error: (err) => {
        this.toastTopicoExcluido("Erro ao excluir tópico")
        console.error(err);
      }
    });
  }

  toastTopicoExcluido(msg: string) {
    this.toastCtrl.create({
      message: msg,
    }).then(toast => {
      toast.present();
    });
  }
}
