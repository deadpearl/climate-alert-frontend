import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
                private router: Router, private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.auth.currentToken;
        const authReq = req.clone(authToken ? {setHeaders: {'x-auth-token': authToken}} : {});

        return next.handle(authReq).pipe(tap(
            () => {
            },
            (err: any) => {
                if (err instanceof HttpErrorResponse &&  (err.status === 403 || err.status === 401)) {
                    this.auth.logout();
                    this.router.navigate(['/auth/login']);
                }
            }
        ));
    }
}
