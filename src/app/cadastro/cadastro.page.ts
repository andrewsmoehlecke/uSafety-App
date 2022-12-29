import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService, Usuario } from '../services/api-service.service';
import { PasswordValidator } from '../../util/validar-senha';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  podeValidar = false;

  formUsuario: FormGroup = new FormGroup({});
  verificacaoSenha: FormGroup = new FormGroup({});

  constructor(
    public api: ApiServiceService,
    public toastController: ToastController,
    public formBuilder: FormBuilder
  ) {
    this.verificacaoSenha = new FormGroup({
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    }, (formGroup: any) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.formUsuario = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")]],
      nascimento: ['', [Validators.required]],
      senhas: this.verificacaoSenha
    });
  }

  ngOnInit() {
  }

  get errorControl() {
    return this.formUsuario.controls;
  }

  get errorControlSenha() {
    return this.verificacaoSenha.controls;
  }

  cadastrarUsuario() {
    this.podeValidar = true;

    console.log(this.errorControl)

    if (this.formUsuario.valid && this.verificacaoSenha.valid) {
      let usuario: Usuario = {
        id: 0,
        username: this.formUsuario.value.username,
        nomeCompleto: this.formUsuario.value.nome,
        email: this.formUsuario.value.email,
        dataNascimento: this.formUsuario.value.nascimento,
        senha: this.formUsuario.value.senhas.senha
      }

      this.api.cadastrarUsuario(usuario).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
