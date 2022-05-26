import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'

const URL = 'http://44.196.172.114:3008/api/v1';

// const URL = 'http://localhost:3008/api/v1'

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    constructor(private http:HttpClient,private router: Router) { }

    login(email: string, password: string) {


      return this.http.post<any>( `${URL}`+'/admin-login', { email: email, password: password })
        .pipe(map(user => {

          if(user && user.data.token){
            localStorage.setItem('token', user.data.token);
          return user;
          }
        }));
    }

    public getToken() {
      return localStorage.getItem('token');
      }

    loggedIn() {
    return !!localStorage.getItem('token')

    }

    logout() {

      localStorage.removeItem('token');
      this.router.navigate(['/login'])

    }


    // Admin Api

    dashboard() : Observable<any>{
      return this.http.get(`${URL}`+'/dashboard')
    }

    getUser(offset,limit,currentPage) : Observable<any> {
      return this.http.get(`${URL}`+'/get-user/'+`${offset}`+'/'+`${limit}`+'/'+`${currentPage}`);
    }

    getMovies(offset,limit,currentPage) : Observable<any>{

      return this.http.get(`${URL}`+'/get-movies/'+`${offset}`+'/'+`${limit}`+'/'+`${currentPage}`);
    }

    updateProfile(profile) : Observable<any> {
      return this.http.post(`${URL}`+'/update-admin-details',profile);
    }

    importCsv(csv_file) : Observable<any> {
      return this.http.post(`${URL}`+'/import-csv',{"csv_file":csv_file});
    }

    getAdminDetails() : Observable<any> {
      return this.http.get(`${URL}`+'/get-admin-details/');
    }

}
