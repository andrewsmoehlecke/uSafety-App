import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-duvidas',
  templateUrl: './duvidas.page.html',
  styleUrls: ['./duvidas.page.scss'],
})
export class DuvidasPage implements OnInit {

  duvidas: TopicoDto[] = [];

  constructor(
    private api: ApiServiceService,
    private router: Router,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.buscarDuvidas();
  }

  buscarDuvidas() {
    this.api.buscarDuvidas().subscribe({
      next: (res: TopicoDto[]) => {
        console.log(res);
        this.duvidas = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

  adicionarDuvida() {
    this.router.navigate(['/tabs/criar-topico', { tipo: "dúvida" }]);
  }

  abrirVisualizacaoCompleta(duvida: TopicoDto) {
    this.router.navigate(['/tabs/duvida', { duvida: JSON.stringify(duvida) }]);
  }

}
