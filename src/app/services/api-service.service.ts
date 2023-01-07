import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, share, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url = 'http://localhost:8080';

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

  login(login: Login) {
    return this.http.post<Token>(this.url + "/login", login)
      .pipe(
        map((res: Token) => {
          if (res.token != undefined) {
            this.storage.set('token', res.token);
            console.log('Token recebido:' + res.token);

            // @ts-ignore: Object is possibly 'null'.
            let tokenInfo = JSON.parse(atob(res.token.match(/\..*\./)[0].replace(/\./g, '')));
            console.log("info token:" + tokenInfo.exp);
            this.storage.set('token_expiration', tokenInfo.exp);

            this.storage.set('isAdmin', res.admin);

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

  buscarConteudo() {
    return this.http.get<TopicoDto[]>(this.url + "/topico/buscarConteudos")
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  listarUsuarios() {
    return this.http.get<Usuario[]>(this.url + "/usuario/listarUsuarios")
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  buscarDuvidas() {
    return this.http.get<TopicoDto[]>(this.url + "/topico/buscarDuvidas")
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adicionarDuvida(duvida: TopicoDto) {
    return this.http.post<TopicoDto>(this.url + "/topico/criarDuvida", duvida)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  buscarDiscussoes() {
    return this.http.get<TopicoDto[]>(this.url + "/topico/buscarDiscussoes")
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }
}


export interface TopicoDto {
  id: number;
  titulo: string;
  conteudo: string;
  horaPublicacao: string;
  horaEdicao: string;
  imagem: string;
  anonimo: boolean;
  autor: Usuario;
}
export interface Token {
  admin: boolean;
  token: string;
  error: string;
}
export interface Login {
  username: string;
  senha: string;
}
export interface Usuario {
  id: number;
  username: string;
  nomeCompleto: string;
  email: string;
  dataNascimento: string;
  senha: string;
  fotoPerfil?: string;
}