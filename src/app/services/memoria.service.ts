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

  // la pareja  async+await permiten "detener la ejecucion" hasta que el datos aea rescatado
  // de esta forma la constante "item" no se entregará (await) para retornar hasta que sea obtenida del storage
  // cuando es obtenida, el await suelta el dato y return devuelve
  async leerDato( dato: any ) {
    const item = await this.storage.get( dato );
    return item;
  }

  traerDato( campo: any ) {
    return this.storage.get( campo );
  }


}
