import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  usuario       = [];
  user          = undefined;
  cualquierDato = undefined;

  constructor( private storage: Storage ) { }

  guardarDato( nombre: string, valor: any ) {
    this.storage.set( nombre, valor );
  }

  async leerDato( dato: any ) {
    const items = await this.storage.get( dato );
    console.log( 'itemes rescatados->', items );
  }

  traerDato( campo: any ) {
    return this.storage.get( campo );
  }


}
