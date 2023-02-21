import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-recuperar-acesso',
  templateUrl: './recuperar-acesso.page.html',
  styleUrls: ['./recuperar-acesso.page.scss'],
})
export class RecuperarAcessoPage implements OnInit {

  @ViewChild(IonModal) modal: IonModal;

  formRecuperarAcesso: FormGroup;
  podeValidar = false;

  isModalOpen = false;

  codigoRecuperacao: string;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private toastCtrl: ToastController,
    private router: Router,
  ) {
    this.formRecuperarAcesso = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit() { }

  get errorControl() {
    return this.formRecuperarAcesso.controls;
  }

  enviarCodRecuperao() {
    this.podeValidar = true;

    if (this.formRecuperarAcesso.valid) {
      this.api.enviarCodRecuperao(this.formRecuperarAcesso.value.username).subscribe({
        next: (res) => {
          if (res.resposta == "emailEnviado") {
            this.toast("Um código de recuperação foi enviado para o seu e-mail");
            this.abrirModal();
          } else if ("erroAoEnviarEmail") {
            this.toast("Erro ao enviar código de recuperação");
          }
        },
        error: (err) => {
          this.toast("Erro ao enviar código de recuperação");

          console.error(err);
        }
      });
    }
  }

  recuperarAcesso() {
    if (this.codigoRecuperacao != "") {
      this.api.recuperarAcesso(this.formRecuperarAcesso.value.username, this.codigoRecuperacao).subscribe({
        next: (res) => {
          if (res != undefined) {
            this.fecharModal();
            this.router.navigate(['/tabs/topicos']);
          } else {
            this.toast("Código de recuperação inválido.");
          }
        },
        error: (err) => {
          this.toast("Erro ao enviar código de recuperação");
          console.error(err);
        }
      });
    } else {
      this.toast("Insira o código de recuperação.");
    }
  }

  toast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
    }).then(toast => {
      toast.present();
    });
  }

  fecharModal() {
    this.modal.dismiss();
  }

  abrirModal() {
    this.modal.present();
  }
}
