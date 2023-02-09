import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { PasswordValidator } from 'src/util/validar-senha';
import { AlterarSenhaDto, ApiServiceService } from '../services/api-service.service';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.page.html',
  styleUrls: ['./alterar-senha.page.scss'],
})
export class AlterarSenhaPage implements OnInit {

  formSenha: FormGroup;
  verificacaoSenha: FormGroup;

  paginaAnterior: string;
  idUsuario: number;

  podeValidar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private api: ApiServiceService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    this.paginaAnterior = String(this.route.snapshot.paramMap.get('from'));
    this.idUsuario = Number(this.route.snapshot.paramMap.get('id'))

    this.inicializarForm();
  }

  ngOnInit() { }

  inicializarForm() {
    this.verificacaoSenha = new FormGroup({
      senha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      confirmarSenha: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    }, (formGroup: any) => {
      return PasswordValidator.areEqual(formGroup);
    });

    if (this.paginaAnterior == "usuario") {
      this.formSenha = this.formBuilder.group({
        senhaAtual: ['', Validators.required],
        novaSenha: this.verificacaoSenha,
      });
    } else {
      this.formSenha = this.formBuilder.group({
        senhaAtual: ['', Validators.required],
        novaSenha: this.verificacaoSenha,
      });
    }
  }

  get errorControl() {
    return this.formSenha.controls;
  }

  get errorControlSenha() {
    return this.verificacaoSenha.controls;
  }

  toast(mensagem: string) {
    this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
    }).then(toast => toast.present());
  }

  alterarSenha() {
    this.podeValidar = true;

    if (this.formSenha.valid || this.paginaAnterior == "usuario") {
      let dto: AlterarSenhaDto = {
        senhaAtual: this.formSenha.value.senhaAtual,
        novaSenha: this.formSenha.value.novaSenha.senha
      }

      if (this.paginaAnterior == "usuario") {
        this.api.adminAlterarSenhaDoUsuario(dto, this.idUsuario).subscribe({
          next: (res) => {
            if (res.resposta == "senhaAlterada") {
              this.toast("Senha alterada com sucesso!");
              this.navCtrl.navigateBack('/tabs/usuarios');
            } else {
              this.toast("Senha atual incorreta!");
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
      } else {
        this.api.alterarSenha(dto, this.idUsuario).subscribe({
          next: (res) => {
            if (res.resposta == "senhaAlterada") {
              this.toast("Senha alterada com sucesso!");
              this.navCtrl.navigateBack('/tabs/topicos');
            } else {
              this.toast("Senha atual incorreta!");
            }
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    }
  }
}
