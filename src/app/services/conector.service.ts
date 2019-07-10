import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActividadModel } from '../models/actividad.model';
import { MemoriaService } from './memoria.service';

@Injectable({
  providedIn: 'root'
})
export class ConectorService {

  url    = undefined;
  puerto = undefined;
  url2   = undefined;

  constructor(private http: HttpClient,
              public memoria: MemoriaService) {}

  async inicializa() {
    const dummy1 = await this.memoria.leerDato('gotel_url')
                            .then( dato => {  this.url = dato || 'http://localhost';
                                              console.log('inicializa_gotel_url', this.url ); } );
    const dummy2 = await this.memoria.leerDato('gotel_puerto')
                            .then( dato => {  this.puerto = dato || '3060';
                                              console.log('inicializa_gotel_puerto', this.puerto ); } );
  }

  traeDatos( ruta ) {
    console.log('ConectorService.traeDatos() ', this.url, this.puerto );
    return this.http.get( this.url + ':' + this.puerto + ruta );
  }

  // cambié los nombres para clarificar los parametros nada mas
  // si los parametros se llaman igual como los items del objeto se pasan asi no mah.... como 'usuario'
  putMesa( code: string, estate: number, usuario: string ) {
    const body = {  codigo:  code,
                    estado:  estate,
                    usuario };
    console.log('ConectorService.putMesa() ', this.url + ':' + this.puerto + '/mesaput',  body );
    return this.http.post( this.url + ':' + this.puerto + '/mesaput', body );
  }

  putActividad( actividad: ActividadModel ) {
    const body = { actividad };
    console.log('ConectorService.putActividad() ', this.url + ':' + this.puerto + '/actividadespost',  body );
    return this.http.post( this.url + ':' + this.puerto + '/actividadespost', body );
  }

  getActividadDia( fechaIni: string, fechaFin: string ) {
    console.log('ConectorService.getActividadDia() ', this.url + ':' + this.puerto + '/actividadespost', fechaIni, fechaFin );
    return this.http.get( this.url + ':' + this.puerto + `/actividades/${fechaIni}/${fechaFin}` );
  }

}

