import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-recuperar-acesso',
  templateUrl: './recuperar-acesso.page.html',
  styleUrls: ['./recuperar-acesso.page.scss'],
})
export class RecuperarAcessoPage implements OnInit {

  formCodRecuperacao: FormGroup;
  podeValidar = false;

  isModalOpen = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private toastCtrl: ToastController,
  ) {
    this.formCodRecuperacao = this.formBuilder.group({
      username: ['', Validators.required],
    });
  }

  ngOnInit() { }

  get errorControl() {
    return this.formCodRecuperacao.controls;
  }

  enviarCodRecuperao() {
    this.podeValidar = true;

    if (this.formCodRecuperacao.valid) {
      this.api.enviarCodRecuperao(this.formCodRecuperacao.value.username).subscribe({
        next: (res) => {
          if (res.resposta == "emailEnviado") {
            this.toast("Um código de recuperação foi enviado para o seu e-mail");
            this.setOpen(true);
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
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  toast(msg: string) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000,
    }).then(toast => {
      toast.present();
    });
  }

}
