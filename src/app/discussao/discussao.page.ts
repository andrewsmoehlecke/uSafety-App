import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TopicoDto } from '../services/api-service.service';

@Component({
  selector: 'app-discussao',
  templateUrl: './discussao.page.html',
  styleUrls: ['./discussao.page.scss'],
})
export class DiscussaoPage implements OnInit {

  discussao: TopicoDto;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.discussao = JSON.parse(this.route.snapshot.paramMap.get('discussao') || '{}');
  }

  ngOnInit() {
  }

}
