import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PasswordValidator } from 'src/util/validar-senha';
import { ApiServiceService, Usuario } from '../services/api-service.service';

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
  ) {
    this.usuario = JSON.parse(this.route.snapshot.paramMap.get('usuario') || '{}');
  }

  ngOnInit() {
    this.iniciarFormulario();
  }


  iniciarFormulario() {
    if (this.usuario) {
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
    this.apiService.adminEditarUsuario(this.formUsuario.value).subscribe({
      next: (res) => {
        if (res.resposta == "usuarioAtualizado") {
          this.toast("Perfil atualizado com sucesso!");
        }
      },
      error: (err) => {
        this.toast("Erro ao atualizar perfil!");
        console.error(err);
      }
    });
  }

  toast(mensagem: string) {
    this.toastController.create({
      message: mensagem,
      duration: 2000
    }).then((toast) => {
      toast.present();
    });
  }
}
