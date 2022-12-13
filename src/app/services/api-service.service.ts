import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, share, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'http://localhost:6000';

  constructor(
    public http: HttpClient,
    public storage: Storage,
  ) { }

  cadastrarUsuario(usuario: Usuario) {
    return this.http.post<Token>(this.url + "/usuario/criar", usuario)
      .pipe(
        map((res: Token) => {
          if (res.token != undefined) {
            this.storage.set('token', res.token);
            console.log('Token recebido:' + res.token);

            // @ts-ignore: Object is possibly 'null'.
            let tokenInfo = JSON.parse(atob(res.token.match(/\..*\./)[0].replace(/\./g, '')));
            console.log("info token:" + tokenInfo.exp);
            this.storage.set('token_expiration', tokenInfo.exp);

            return res.token;
          } else {
            return res.error;
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }
}

export interface Token {
  token: string;
  error: string;
}
export interface Usuario {
  id: number;
  username: string;
  nome: string;
  email: string;
  senha: string;
}