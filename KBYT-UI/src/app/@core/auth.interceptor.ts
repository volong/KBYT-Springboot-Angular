import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { NzMessageService } from 'ng-zorro-antd';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.tokenSubject.value
        if (token) {
            req = req.clone(
                {
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }
        return next.handle(req).pipe(
            map(e => {
                // console.log(e)
                return e

            }),
            catchError(err => {
                if (err.status == 401) {
                    this.authService.goToSignInPage()
                }
                console.log(err.status)
                return throwError(err)
            })
        );
    }
}