import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceService, Usuario } from '../services/api-service.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
})
export class UsuarioPage implements OnInit {

  usuario: Usuario;

  formUsuario: FormGroup = new FormGroup({});

  podeValidar: boolean = false;

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
    this.formUsuario = this.formBuilder.group({
      id: [this.usuario.id],
      username: [this.usuario.username],
      nomeCompleto: [this.usuario.nomeCompleto],
      email: [this.usuario.email],
      dataNascimento: [this.usuario.dataNascimento],
      senha: [this.usuario.senha],
      fotoPerfil: [this.usuario.fotoPerfil]
    });
  }

  get errorControl() {
    return this.formUsuario.controls;
  }

  salvarPerfil() {
    this.apiService.adminEditarUsuario(this.formUsuario.value).subscribe((res: any) => {
      this.toast(res);
    }, (err: any) => {
      this.toast(err);
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
