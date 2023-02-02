import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiServiceService, Usuario } from '../services/api-service.service';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.page.html',
  styleUrls: ['./meu-perfil.page.scss'],
})
export class MeuPerfilPage implements OnInit {

  podeValidar: boolean = false;

  formUsuario: FormGroup;

  usuario: Usuario;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiServiceService,
    private toastCtrl: ToastController
  ) {
    this.buscarPerfil();
  }

  ngOnInit() { }

  buscarPerfil() {
    this.api.buscarUsuarioLogado().subscribe({
      next: (res) => {
        this.usuario = res;
        this.inicializarFormulario();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  salvarPerfil() {
    this.podeValidar = true;

    if (this.formUsuario.valid) {
      this.api.atualizarPerfil(this.formUsuario.value).subscribe({
        next: (res) => {
          if (res.resposta == "usuarioAtualizado") {
            this.toast('Perfil atualizado com sucesso!');
          } else if (res.resposta == "usuarioNaoEncontrado") {
            this.toast('Erro ao atualizar perfil!');
          }
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  get errorControl() {
    return this.formUsuario.controls;
  }

  inicializarFormulario() {
    this.formUsuario = this.formBuilder.group({
      id: [this.usuario.id, [Validators.required]],
      username: [this.usuario.username, [Validators.required, Validators.minLength(4)]],
      nomeCompleto: [this.usuario.nomeCompleto, [Validators.required]],
      email: [this.usuario.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")]],
      dataNascimento: [this.usuario.dataNascimento, [Validators.required]],
      fotoPerfil: [this.usuario.fotoPerfil, Validators.pattern("^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$")],
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
}
