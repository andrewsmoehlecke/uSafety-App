import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-discussoes',
  templateUrl: './discussoes.page.html',
  styleUrls: ['./discussoes.page.scss'],
})
export class DiscussoesPage implements OnInit {

  discussoes: TopicoDto[] = [];

  constructor(
    private api: ApiServiceService,
    private router: Router,
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.buscarDiscussoes();
  }

  buscarDiscussoes() {
    this.api.buscarDiscussoes().subscribe({
      next: (res: TopicoDto[]) => {

        this.discussoes = res;
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }


  adicionarDiscussao() {
    this.router.navigate(['/tabs/criar-topico', { tipo: "discussão" }]);
  }

  abrirVisualizacaoCompleta(discussao: TopicoDto) {
    this.router.navigate(['/tabs/discussao', { discussao: JSON.stringify(discussao) }]);
  }
}
