import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  fechaHoy   = undefined;
  fechaModif = undefined;
  horaModif  = undefined;

  constructor() { }

  mesAnumero( mesAbreviado: any ) {
    let mesNum: any;
    switch (mesAbreviado) {
    case 'Jan': mesNum = '01'; break;
    case 'Feb': mesNum = '02'; break;
    case 'Mar': mesNum = '03'; break;
    case 'Apr': mesNum = '04'; break;
    case 'May': mesNum = '05'; break;
    case 'Jun': mesNum = '06'; break;
    case 'Jul': mesNum = '07'; break;
    case 'Aug': mesNum = '08'; break;
    case 'Sep': mesNum = '09'; break;
    case 'Oct': mesNum = '10'; break;
    case 'Nov': mesNum = '11'; break;
    case 'Dec': mesNum = '12';
    }
    return mesNum;
  }

  formatoFechaUno( fecha ) {
      const dia        = fecha.slice( 8, 10 );
      const mesPalabra = fecha.slice( 4, 7 );
      const mesNumero  = this.mesAnumero( mesPalabra );
      //
      const anno = fecha.slice( 11, 15 );
      const hora = fecha.slice( 16, 24 );
      //
      this.fechaHoy  = dia + '-' + mesNumero + '-' + anno;
      this.horaModif = hora;
      //
      console.log('fecha Hoy:', this.fechaHoy );
      console.log('horaModif', this.horaModif );
  }

  formatoFechaDos( fecha ) {
      //
      fecha = fecha.toString();
      console.log(fecha);
      //
      const dia  = fecha.slice( 8, 10 );
      const mes  = fecha.slice( 5, 7  );
      const anno = fecha.slice( 0, 4  );
      const hora = fecha.slice( 11, 19);
      //
      this.fechaModif = dia + '-' + mes + '-' + anno;
      this.horaModif  = hora;
      //
      console.log('fecha modificada:', this.fechaModif );
      console.log('horaModif', this.horaModif );
      //
  }

}
