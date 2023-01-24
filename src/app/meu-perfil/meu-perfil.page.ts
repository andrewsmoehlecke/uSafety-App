import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  ) {
    this.buscarPerfil();
    this.inicializarFormulario();
  }

  ngOnInit() { }

  buscarPerfil() {
    this.api.buscarUsuarioLogado().subscribe(
      (res: Usuario) => {
        this.usuario = res;
      }, (err) => {
        console.log(err);
      }
    );
  }

  salvarPerfil() {
    this.podeValidar = true;

  }

  selecionarImagem() {
    console.log('Selecionar imagem');
  }

  get errorControl() {
    return this.formUsuario.controls;
  }

  inicializarFormulario() {
    this.formUsuario = this.formBuilder.group({
      id: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$")]],
      nascimento: ['', [Validators.required]],
      fotoPerfil: ['', Validators.required]
    });
  }
}
