import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiServiceService, Usuario } from '../services/api-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  podeValidar = false;

  formUsuario = {
    id: 0,
    username: '',
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  };

  constructor(
    public api: ApiServiceService
  ) {
  }

  ngOnInit() {
  }



  cadastrarUsuario() {
    console.log(this.formUsuario)
    this.podeValidar = true;

    if (this.formUsuario) {
      this.api.cadastrarUsuario(this.formUsuario).subscribe({
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
