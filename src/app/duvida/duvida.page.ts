import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ApiServiceService, ComentarioDto, TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-duvida',
  templateUrl: './duvida.page.html',
  styleUrls: ['./duvida.page.scss'],
})
export class DuvidaPage implements OnInit {

  duvida: TopicoDto;

  podeExcluir: boolean = false;

  podeValidar: boolean = false;

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
    this.duvida = JSON.parse(this.route.snapshot.paramMap.get('duvida') || '{}');
    this.verificarSePodeExcluir();
    this.iniciarFormComentario();
  }

  ngOnInit() { }

  iniciarFormComentario() {
    this.formComentario = this.formBuilder.group({
      conteudo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(60)]],
      topico: [''],
    });
  }

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
        this.toast("Dúvida excluida com sucesso!");
        this.navCtrl.navigateBack("/tabs/duvidas");
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
      this.formComentario.value.topico = this.duvida.id;

      this.api.adicionarComentario(this.formComentario.value).subscribe({
        next: (res) => {
          this.toast("Comentário adicionado com sucesso!");
        }, error: (err) => {
          this.toast("Erro ao adicionar comentário")
          console.error(err);
        }
      });
    }

    this.formComentario.reset();
  }

  buscarComentarios() {
    this.api.buscarComentariosPorTopico(this.duvida.id).subscribe({
      next: (res) => {
        this.comentarios = res;
      }, error: (err) => {
        console.error(err);
      }
    });
  }
}
