import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";



@Injectable({
  providedIn: 'root'
})
export class MemoriaService {

  usuario:any[]=[];
  user:any;

  constructor(private storage:Storage) { }


  guardarDato(nombre:string,valor:any){
    this.storage.set(nombre,valor)
  }



  async leerDato(campo:any){
    const items = await this.storage.get(campo);
    items;
    console.log("items", items);
  }

  traerDato(campo:any){
    return this.storage.get(campo).then((val) => {
      console.log('Your age is', val);
    });
  }
  


}
