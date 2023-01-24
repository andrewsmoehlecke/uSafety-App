import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-topicos',
  templateUrl: './topicos.page.html',
  styleUrls: ['./topicos.page.scss'],
})
export class TopicosPage implements OnInit {

  listaConteudo: TopicoDto[] = [];

  isAdmin: boolean = false;

  constructor(
    private api: ApiServiceService,
    private router: Router,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.buscarConteudo();
    this.verificarCargo();
  }

  buscarConteudo() {
    this.api.buscarConteudo().subscribe({
      next: (res) => {
        console.log(res);
        this.listaConteudo = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  abrirVisualizacaoCompleta(topico: TopicoDto) {
    this.router.navigate(['/tabs/topico', { topico: JSON.stringify(topico) }]);
  }

  verificarCargo() {
    this.storage.get('isAdmin').then((admin: boolean) => {
      this.isAdmin = admin;
    });
  }

  adicionarConteudo() {
    this.router.navigate(['/tabs/criar-topico', { tipo: "conteúdo" }]);
  }
}
