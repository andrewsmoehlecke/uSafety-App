import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { PasswordValidator } from '../../util/validar-senha';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  podeValidar = false;

  formUsuario: FormGroup;

  constructor(
    public api: ApiServiceService,
    public toastController: ToastController,
    public formBuilder: FormBuilder
  ) {
    let verificacaoSenha = new FormGroup({
      senha: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6)])
    }, (formGroup: any) => {
      return PasswordValidator.areEqual(formGroup);
    });

    this.formUsuario = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senhas: verificacaoSenha
    });
  }

  ngOnInit() {
  }

  cadastrarUsuario() {
    this.podeValidar = true;

    if (this.formUsuario.valid) {
      console.log(this.formUsuario.value)
      this.api.cadastrarUsuario(this.formUsuario.value).subscribe({
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
