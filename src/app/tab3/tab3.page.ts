import { Component } from '@angular/core';
import { ConectorService } from '../services/conector.service';
import { FechasService } from '../services/fechas.service';
import { ModalController } from '@ionic/angular';
import { ModalMesaPage } from "../components/modal-mesa/modal-mesa.page";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fechaAhora:string = new Date().toString();
  fechaModif:string;

  actividades:any[]=[];
  public loading:boolean;


  constructor( private conector:ConectorService,
               private fechas:FechasService,
               public modalController:ModalController){

               this.formatoUno(this.fechaAhora)
               this.loading=true;
               this.traerActividades(this.fechas.fechaHoy,this.fechas.fechaHoy);
  }
  
  traerActividades(fechaIni,fechaFin){ 
    this.conector.getActividadDia(fechaIni,fechaFin)
    .subscribe(val=>{
        console.log(val["datos"]);
        this.actividades=val["datos"];
        this.loading=false;
    })
  }

  buscarFecha(fecha){
    this.fechas.formatoFechaDos(fecha)
    console.log(this.fechas.fechaModif);
    this.traerActividades(this.fechas.fechaModif,this.fechas.fechaModif)
  }

  formatoUno(fecha){
    this.fechas.formatoFechaUno(fecha);
  }

  formatoDos(fecha){
    this.fechas.formatoFechaDos(fecha);
  }

 prueba(){
   console.log(this.fechas.fechaHoy)
  }


  doRefresh(event) {
    console.log('Begin async operation');
    //this.traerActividades();
  
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  


  async presentModal(mesa,usuario,estado,fecha,hora) {
    const modal = await this.modalController.create({
      component: ModalMesaPage,
      componentProps: {
        'mesa': mesa,
        'usuario': usuario,
        'estado': estado,
        'fecha': fecha.slice(0,10),
        'hora':hora
      }
    });
    return await modal.present();
  }




}
