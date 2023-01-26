import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-discussao',
  templateUrl: './discussao.page.html',
  styleUrls: ['./discussao.page.scss'],
})
export class DiscussaoPage implements OnInit {

  discussao: TopicoDto;

  podeExcluir: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: Storage,
    private api: ApiServiceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.discussao = JSON.parse(this.route.snapshot.paramMap.get('discussao') || '{}');
    this.verificarSePodeExcluir();
  }

  ngOnInit() {
  }

  excluirDiscussaoAlert() {
    this.alertController.create({
      header: "Tem certeza que deseja excluir esta discussão?",
      message: "Esta ação não pode ser desfeita.",
      backdropDismiss: true,
      cssClass: "alerta-excluir-discussao",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",
          handler: () => {
            this.adminExcluirTopico(this.discussao.id)
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
      if (username == this.discussao.autor.username) {
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
      next: (res) => {
        this.toastTopicoExcluido("Discussão excluida com sucesso!");
        this.navCtrl.navigateBack("/tabs/discussoes");
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
