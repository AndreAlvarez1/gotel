import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConectorService {

  url:string = "http://localhost:3060"
  port: string= "3060";
  constructor(private http:HttpClient) { }


  traeDatos(ruta){
    let direccion = this.url + ruta;
    return this.http.get(direccion);
  }

  putMesa(codigo:string,estado:number){
    const body={codigo:codigo,
                estado:estado};
    return this.http.post('http://localhost:3060/mesaput',body);
  }





}

