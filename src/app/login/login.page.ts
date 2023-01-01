import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiServiceService, Login } from '../services/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  podeValidar = false;

  formLogin: FormGroup = new FormGroup({});

  constructor(
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,

  ) {
    this.formLogin = this.formBuilder.group({
      username: ['', Validators.required],
      senha: ['', Validators.required]
    });
  }

  ngOnInit() { }

  get errorControl() {
    return this.formLogin.controls;
  }

  login() {
    this.podeValidar = true;

    if (this.formLogin.valid) {
      let login: Login = {
        username: this.formLogin.value.username,
        senha: this.formLogin.value.senha
      }

      this.api.login(login).subscribe({
        next: (res) => {
          this.navCtrl.navigateForward("/tabs/topicos");
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
