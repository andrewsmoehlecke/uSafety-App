import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(
    public storage: Storage,
    private router: Router,
  ) {
    this.createStorage();
  }

  createStorage() {
    this.storage.create();
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.storage.get('token');
    return from(promise)
      .pipe(
        mergeMap(token => {
          let clonedReq = this.addToken(request, token);
          return next.handle(clonedReq).pipe(
            catchError(error => {
              if (error.status == 440 || error.status == 401) {
                console.warn("Token expirado!");
                this.storage.clear();
                this.router.navigate(['/login'])
              }
              return throwError(() => error)
            })
          );
        })
      );
  }

  private addToken(request: HttpRequest<any>, token: any) {
    if (token) {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          Authorization: "Bearer " + token
        }
      });
      return clone;
    } else {
      let clone: HttpRequest<any>;
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          'Content-Type': `application/json`
        }
      });

      return clone;

    }
  }
}
