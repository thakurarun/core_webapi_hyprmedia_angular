import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { catchError, finalize, map } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import { ProgressLayoutSharedService } from './progressLoader/progress.shared.service';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';

@Injectable()
export class AppHttpClientInterceptor implements HttpInterceptor {

    private _requested = 0;
    get pendingRequests(): number {
        return this._requested;
    }

    public constructor(private progressLayoutSharedService: ProgressLayoutSharedService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url: string = 'http://localhost:4545/';
        if (this.progressLayoutSharedService.onStart) {
            this._requested++;
            this.progressLayoutSharedService.onStart();
        }
        // TODO: put custom  request headers..        
        request = request.clone({
            url: url + request.url
        });
        return next.handle(request)
            .pipe(
            map(event => {
                return event;
            }),
            catchError(error => {
                return Observable.throw(error);
            }),
            finalize(() => {
                if (this.progressLayoutSharedService.onEnd) {
                    this._requested--;
                }

                if (this._requested <= 0 && this.progressLayoutSharedService.onEnd) {
                    this.progressLayoutSharedService.onEnd();
                }
            })
            );
    }
}
