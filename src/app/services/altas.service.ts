import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AltaModel } from '../models/alta.modelo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AltasService {
  private url = 'https://login-app-52850-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearAlta(alta: AltaModel) {
    return this.http.post(`${this.url}/Registro.json`, alta).pipe(
      map((resp: any) => {
        alta.id = resp.name;
        return alta;
      })
    );
  }

  actualizarRegistro(alta: AltaModel) {
    const altaTemp = {
      ...alta,
    };
    delete altaTemp.id;

    return this.http.put(`${this.url}/Registro/${alta.id}.json`, altaTemp);
  }

  getRegistroById( id : string ){
    return this.http.get(`${this.url}/Registro/${id}.json`);

  }

  getRegistros() {
    return this.http
      .get(`${this.url}/Registro.json`)
      .pipe(map(this.crearArreglo));
  }
  private crearArreglo(registrosObj: Object) {
    const registros: AltaModel[] = [];
    console.log(registrosObj);

    Object.keys(registrosObj).forEach((key) => {
      const registro: AltaModel = registrosObj[key];
      registro.id = key;
      registros.push(registro);
    });

    if (registrosObj == null) {
      return [];
    }

    return registros;
  }
}
