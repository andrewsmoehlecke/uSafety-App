import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-duvida',
  templateUrl: './duvida.page.html',
  styleUrls: ['./duvida.page.scss'],
})
export class DuvidaPage implements OnInit {

  duvida: TopicoDto;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.duvida = JSON.parse(this.route.snapshot.paramMap.get('duvida') || '{}');
  }

  ngOnInit() { }

}
