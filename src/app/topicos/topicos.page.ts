import { Component, OnInit } from '@angular/core';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-topicos',
  templateUrl: './topicos.page.html',
  styleUrls: ['./topicos.page.scss'],
})
export class TopicosPage implements OnInit {

  listaConteudo: TopicoDto[] = [];

  constructor(
    private api: ApiServiceService,
  ) { }

  ngOnInit() {
    this.buscarConteudo();
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

}
