import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActividadModel } from '../models/actividad.model';
import { MemoriaService } from './memoria.service';

@Injectable({
  providedIn: 'root'
})
export class ConectorService {

  url:any = "http://localhost:3060";
  port:string = "3060";
  url2:any = "";


  constructor(private http:HttpClient,
              public memoria:MemoriaService) { 

                this.memoria.leerDato('memoUrl')
                .then( dato => this.url2 = dato );
              }


  traeDatos(ruta){
    let direccion = this.url + ruta;
    console.log("url2",this.url2)
    return this.http.get(direccion);
  }

  putMesa(codigo:string,estado:number,usuario:string){
    const body={codigo:codigo,
                estado:estado,
                usuario:usuario};
    return this.http.post(this.url +'/mesaput',body);
  }
  

  putActividad(actividad:ActividadModel){
    
    const body={actividad};
    return this.http.post(this.url+'/actividadespost',body);
  }


  getActividadDia(fechaIni:string,fechaFin:string){
    return this.http.get(this.url+`/actividades/${fechaIni}/${fechaFin}`)
  }
 



}

