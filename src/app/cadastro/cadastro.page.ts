import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  podeValidar = false;

  formUsuario: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public api: ApiServiceService
  ) { }

  ngOnInit() {
    this.formUsuario = this.formBuilder.group({

      nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', Validators.required),
      confirmarSenha: new FormControl('', Validators.required)
    });
  }

  get errosForm() {
    return this.formUsuario.controls;
  }

  cadastrarUsuario() {
    this.podeValidar = true;

    if (this.formUsuario.valid) {
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
