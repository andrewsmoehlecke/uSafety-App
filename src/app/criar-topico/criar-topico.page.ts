import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { ToastController } from '@ionic/angular';
import { ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-criar-topico',
  templateUrl: './criar-topico.page.html',
  styleUrls: ['./criar-topico.page.scss'],
})
export class CriarTopicoPage implements OnInit {

  tipoTopico: string;
  podeValidar: boolean = false;

  form: FormGroup = new FormGroup({});

  constructor(
    private api: ApiServiceService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker,
  ) {
    this.tipoTopico = String(this.route.snapshot.paramMap.get('tipo'));

    this.form = this.formBuilder.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      horaPublicacao: [''],
      horaEdicao: [''],
      imagem: ['', Validators.required],
      anonimo: [''],
      autor: [''],
    });
  }

  ngOnInit() { }

  get errorControl() {
    return this.form.controls;
  }

  selecionarImagem() {
    this.imagePicker.getPictures({
      maximumImagesCount: 1,
      outputType: 1
    }).then((results: any) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ')
        console.log(results[i])
        this.form.value.imagem = results[i];

        // ref('imagens/' + this.form.value.imagem).putString(this.form.value.imagem, 'base64', { contentType: 'image/png' }).then((res: any) => {
        //   console.log(res);
        // }).catch((err: any) => {
        //   console.error(err);
        // });
      }
    }, (err: any) => {
      console.error(err);
    });
  }

  criarTopico() {
    this.podeValidar = true;

    this.api.criarTopico(this.form.value, this.tipoTopico).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }

}
