import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, ComentarioDto, TopicoDto } from '../services/api-service.service';
import { Storage } from '@ionic/storage-angular';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-discussao',
  templateUrl: './discussao.page.html',
  styleUrls: ['./discussao.page.scss'],
})
export class DiscussaoPage implements OnInit {

  discussao: TopicoDto;

  podeExcluir: boolean = false;

  formComentario: FormGroup = new FormGroup({});

  comentarios: ComentarioDto[] = [];

  constructor(
    private route: ActivatedRoute,
    private alertController: AlertController,
    private storage: Storage,
    private api: ApiServiceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
  ) {
    this.discussao = JSON.parse(this.route.snapshot.paramMap.get('discussao') || '{}');
    this.verificarSePodeExcluir();
    this.iniciarFormComentario();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.buscarComentarios();
  }

  iniciarFormComentario() {
    this.formComentario = this.formBuilder.group({
      conteudo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      topico: [''],
    });
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
        this.toast("Discussão excluida com sucesso!");
        this.navCtrl.navigateBack("/tabs/discussoes");
      },
      error: (err) => {
        this.toast("Erro ao excluir tópico")
        console.error(err);
      }
    });
  }

  toast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
    }).then(toast => {
      toast.present();
    });
  }

  adicionarComentario() {
    this.podeExcluir = true;

    if (this.formComentario.valid) {
      this.formComentario.value.topico = this.discussao.id;

      this.api.adicionarComentario(this.formComentario.value).subscribe({
        next: (res) => {
          this.toast("Comentário adicionado com sucesso!");
          this.buscarComentarios();
        }, error: (err) => {
          this.toast("Erro ao adicionar comentário")
          console.error(err);
        }
      });
    }

    this.formComentario.reset();
  }

  buscarComentarios() {
    this.api.buscarComentariosPorTopico(this.discussao.id).subscribe({
      next: (res) => {
        this.comentarios = res;
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  adminExcluirComentario(id: number) {
    this.api.adminExcluirComentario(id).subscribe({
      next: (res: any) => {
        this.toast("Comentário excluido com sucesso!");
        this.buscarComentarios();
      },
      error: (err: any) => {
        this.toast("Erro ao excluir comentário")
        console.error(err);
      }
    });
  }

  excluirDuvidaAlertComentario(id: number) {
    this.alertController.create({
      header: "Tem certeza que deseja excluir este comentário?",
      message: "Esta ação não pode ser desfeita.",
      backdropDismiss: true,
      cssClass: "alerta-excluir-duvida",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",
          handler: () => {
            this.adminExcluirComentario(id)
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
}
