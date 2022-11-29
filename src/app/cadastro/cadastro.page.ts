import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  podeValidar = false;

  formUsuario: FormGroup;

  constructor(public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formUsuario = this.formBuilder.group({
      nome: ['', Validators.required, Validators.maxLength(30)],
      email: ['', Validators.required, Validators.email],
      senha: ['', Validators.required],
      confirmarSenha: ['', Validators.required]
    });
  }

  get errosForm() {
    return this.formUsuario.controls;
  }

  cadastrarUsuario() {
    this.podeValidar = true;

    console.log(this.formUsuario.valid);
  }
  
}
