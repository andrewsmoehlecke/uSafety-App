import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { catchError, map, throwError } from 'rxjs';

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

            this.storage.set('isAdmin', res.admin);

            this.storage.set('username', res.username);

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

            this.storage.set('username', res.username);

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

  buscarUsuarios() {
    return this.http.get<Usuario[]>(this.url + "/usuario/buscarUsuarios")
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

  criarTopico(topico: TopicoDto, tipo: string) {
    return this.http.post<any>(this.url + "/topico/" + tipo, topico)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  buscarUsuarioLogado() {
    return this.http.get<Usuario>(this.url + "/usuario/buscarUsuarioLogado")
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adminExcluirTopico(id: number) {
    return this.http.delete<any>(this.url + "/topico/excluir/" + id)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adicionarComentario(data: CriarComentarioDto) {
    return this.http.post<any>(this.url + "/comentario/criar", data)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  buscarComentariosPorTopico(id: number) {
    return this.http.get<ComentarioDto[]>(this.url + "/comentario/buscarPorTopico?id=" + id)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adminExcluirComentario(id: number) {
    return this.http.delete<any>(this.url + "/comentario/excluir?id=" + id)
      .pipe(
        map((res: any) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adminEditarUsuario(usuario: Usuario) {
    return this.http.put<RespostaSimplesDto>(this.url + "/usuario/editar", usuario)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adminCriarUsuario(usuario: Usuario) {
    return this.http.post<RespostaSimplesDto>(this.url + "/admin/criar", usuario)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  atualizarPerfil(usuario: Usuario) {
    return this.http.put<RespostaSimplesDto>(this.url + "/usuario/editar", usuario)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  alterarSenha(senha: AlterarSenhaDto, id: number) {
    return this.http.put<RespostaSimplesDto>(this.url + "/usuario/alterarSenha/" + id, senha)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }

  adminAlterarSenhaDoUsuario(senha: AlterarSenhaDto, id: number) {
    return this.http.put<RespostaSimplesDto>(this.url + "/admin/alterarSenhaDoUsuario/" + id, senha)
      .pipe(
        map((res) => {
          return res;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => err)
        })
      );
  }
}

export interface AlterarSenhaDto {
  senhaAtual: string;
  novaSenha: string;
}

export interface RespostaSimplesDto {
  resposta: string;
}

export interface ComentarioDto {
  id: number;
  conteudo: string;
  horaPublicacao: Date;
  ultimaEdicao: Date;
  visivel: boolean;
  autor: Usuario;
}

export interface CriarComentarioDto {
  conteudo: string;
  horaPublicacao: string;
  topico: number;
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
  username: string;
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