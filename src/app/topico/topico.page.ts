import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService, TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-topico',
  templateUrl: './topico.page.html',
  styleUrls: ['./topico.page.scss'],
})
export class TopicoPage implements OnInit {

  topico: TopicoDto;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.topico = JSON.parse(this.route.snapshot.paramMap.get('topico') || '{}');
  }

  ngOnInit() { }

}
