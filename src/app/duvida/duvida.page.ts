import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';
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
    private api: ApiServiceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
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
            this.adminExcluirTopico(this.duvida.id)
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

  adminExcluirTopico(id: number) {
    this.api.adminExcluirTopico(id).subscribe({
      next: (res) => {
        this.toastTopicoExcluido("Dúvida excluida com sucesso!");
        this.navCtrl.navigateBack("/tabs/duvidas");
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
