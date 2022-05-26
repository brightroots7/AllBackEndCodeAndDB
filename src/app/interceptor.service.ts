import { ApiService } from './api.service';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, pipe} from 'rxjs';

import { finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private authentication :ApiService,
    ){}
  count = 0;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        // this.count++;

    request = request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`


      }
    });

    return next.handle(request)
    .pipe ( tap (

      event => {
        // console.log(event)
      },

      error => {
        // console.log( error )
      }), finalize(() => {

      // this.count--;


  }));
  }
}
