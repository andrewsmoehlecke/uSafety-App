import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, Usuario } from '../services/api-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    private api: ApiServiceService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.buscarUsuarios();
  }

  buscarUsuarios() {
    this.api.buscarUsuarios().subscribe({
      next: (res: any) => {
        this.usuarios = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  abrirPerfil(usuario: Usuario) {
    this.router.navigate(['/tabs/usuario', { usuario: JSON.stringify(usuario) }]);
  }
}
