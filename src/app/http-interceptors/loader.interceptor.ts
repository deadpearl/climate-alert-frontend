import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {finalize} from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];

    constructor(private spinnerService: NgxSpinnerService) {
    }

    // removeRequest(req: HttpRequest<any>) {
    //     const i = this.requests.indexOf(req);
    //     if (i >= 0) {
    //         this.requests.splice(i, 1);
    //     }
    //     if (this.requests.length === 0) {
    //         this.spinnerService.hide();
    //     }
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let finished = false;

        setTimeout(() => {
            if (!finished) {
                this.spinnerService.show().then();
            }
        }, 180);

        return next.handle(req).pipe(finalize(() => {
            finished = true;
            this.spinnerService.hide().then();
        }));
    }
}
