import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyB8ejBX7DAwqZGj1hDYPq6-rruUmX5pMQo';

  userToken: string | null = '';

  // CREAR NUEVOS USUARIOS

  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //LOGIN

  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {

    this.leertoken();

  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('expira');

  }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true,
    };
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map((resp) => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );

  }


  nuevoUsuario(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}signUp?key=${this.apikey}`, authData)
      .pipe(
        map((resp) => {
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );

  }


  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }


  leertoken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;

  }


  estaAutenticado(): boolean {
    //return this.userToken.length>2;
    if(this.userToken.length<2){
      return false;
    }

    const expira = Number(localStorage.getItem('expipra'));
    const expiraDate= new Date();
    expiraDate.setTime( expiraDate.getTime() + 3600 * 1000 );


    if(expiraDate > new Date() ){
      return true;

    }
    else{
      return false;

    }


  }

}
