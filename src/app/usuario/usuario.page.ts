import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { PasswordValidator } from 'src/util/validar-senha';
import { ApiServiceService, RespostaSimplesDto, Usuario } from '../services/api-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  usuario: Usuario;

  formUsuario: FormGroup = new FormGroup({});

  verificacaoSenha: FormGroup = new FormGroup({});

  podeValidar: boolean = false;

  readOnly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiServiceService,
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router,
    private alertController: AlertController,
  ) {
    this.usuario = JSON.parse(this.route.snapshot.paramMap.get('usuario') || '{}');
  }

  ngOnInit() {
    this.iniciarFormulario();
  }


  iniciarFormulario() {
    if (this.usuario.id != null) {
      this.readOnly = true;

      this.formUsuario = this.formBuilder.group({
        id: [this.usuario.id],
        username: [this.usuario.username],
        nomeCompleto: [this.usuario.nomeCompleto],
        email: [this.usuario.email],
        dataNascimento: [this.usuario.dataNascimento],
        senha: [this.usuario.senha],
        fotoPerfil: [this.usuario.fotoPerfil]
      });
    } else {
      this.verificacaoSenha = new FormGroup({
        senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
        confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
      }, (formGroup: any) => {
        return PasswordValidator.areEqual(formGroup);
      });

      this.formUsuario = this.formBuilder.group({
        id: [''],
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        nomeCompleto: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email]],
        dataNascimento: ['', Validators.required],
        senha: this.verificacaoSenha,
        fotoPerfil: ['']
      });
    }
  }

  get errorControl() {
    return this.formUsuario.controls;
  }

  get errorControlSenha() {
    return this.verificacaoSenha.controls;
  }

  salvarPerfil() {
    this.podeValidar = true;

    if (this.formUsuario.valid) {
      this.apiService.adminEditarUsuario(this.formUsuario.value).subscribe({
        next: (res) => {
          if (res.resposta == "usuarioAtualizado") {
            this.toast("Perfil atualizado com sucesso!");
            this.navCtrl.navigateBack('/tabs/usuarios');
          }
        },
        error: (err) => {
          this.toast("Erro ao atualizar perfil!");
          console.error(err);
        }
      });
    }
  }

  criarUsuario() {
    this.podeValidar = true;

    if (this.formUsuario.valid) {
      let usuario: Usuario = {
        id: this.formUsuario.value.id,
        username: this.formUsuario.value.username,
        nomeCompleto: this.formUsuario.value.nomeCompleto,
        email: this.formUsuario.value.email,
        dataNascimento: this.formUsuario.value.dataNascimento,
        senha: this.formUsuario.value.senha.senha,
        fotoPerfil: this.formUsuario.value.fotoPerfil,
        ativo: true
      };

      this.apiService.adminCriarUsuario(usuario).subscribe({
        next: (res: RespostaSimplesDto) => {
          console.log(res)
          if (res.resposta == "usuarioCriado") {
            this.toast("Usuário criado com sucesso!");

            this.navCtrl.navigateRoot('/tabs/usuarios');
          }
        },
        error: (err: any) => {
          this.toast("Erro ao criar usuário!");
          console.error(err);
        }
      });
    }
  }

  toast(mensagem: string) {
    this.toastController.create({
      message: mensagem,
      duration: 2000
    }).then((toast) => {
      toast.present();
    });
  }

  alterarSenha() {
    this.router.navigate(['/tabs/alterar-senha', { id: this.usuario.id, from: 'usuario' }]);
  }

  alterarStatusUsuario() {
    if (this.usuario.ativo) {
      this.alertAlterarStatusUsuario("Desabilitar usuário", "Deseja desabilitar o usuário " + this.usuario.username + "?");
    } else {
      this.alertAlterarStatusUsuario("Habilitar usuário", "Deseja habilitar o usuário " + this.usuario.username + "?");
    }
  }

  alertAlterarStatusUsuario(titulo: string, mensagem: string) {
    this.alertController.create({
      header: titulo,
      message: mensagem,
      backdropDismiss: true,
      cssClass: "alerta-alterar-status-usuario",
      buttons: [
        {
          text: "Sim",
          cssClass: "btn-sim",
          handler: () => {
            if (this.usuario.ativo) {
              this.desabilitarUsuario();
            } else {
              this.habilitarUsuario();
            }
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

  desabilitarUsuario() {
    this.apiService.adminDesabilitarUsuario(this.usuario.id).subscribe({
      next: (res: RespostaSimplesDto) => {
        if (res.resposta == "usuarioDesabilitado") {
          this.toast("Usuário desabilitado com sucesso!");
          this.navCtrl.navigateRoot('/tabs/usuarios');
        }
      },
      error: (err: any) => {
        this.toast("Erro ao desabilitar usuário!");
        console.error(err);
      }
    });
  }

  habilitarUsuario() {
    this.apiService.adminHabilitarUsuario(this.usuario.id).subscribe({
      next: (res: RespostaSimplesDto) => {
        if (res.resposta == "usuarioHabilitado") {
          this.toast("Usuário habilitado com sucesso!");
          this.navCtrl.navigateRoot('/tabs/usuarios');
        }
      },
      error: (err: any) => {
        this.toast("Erro ao habilitar usuário!");
        console.error(err);
      }
    });
  }
}
