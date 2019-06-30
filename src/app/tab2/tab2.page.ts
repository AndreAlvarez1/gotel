import { Component } from '@angular/core';
import { ConectorService } from '../services/conector.service';
import { AlertController } from '@ionic/angular';
import { MemoriaService } from '../services/memoria.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mesas:any[]=[];
  loading:boolean;
  public user:any;

  constructor(private conector:ConectorService,
              public alertController: AlertController,
              public memoria:MemoriaService) {


              this.loading=true;
              this.traerMesas();
              

  }

  traerMesas(){ 
    this.conector.traeDatos("/mesas")
    .subscribe(val=>{
        console.log(val["datos"]);
        var i; //arreglo el formato del código borrando los espacios libres
        for( i=0; i < val["datos"].length; i++){
          val["datos"][i].ESTADO = val["datos"][i].ESTADO.replace(/\s/g, ''); }
        this.mesas=val["datos"];
        this.loading=false;
    })
  }

  abrirMesa(codigo:string, estado:string){
    if(estado==="1"){
      //this.piezaLibre()  
      this.libre(codigo)    
    }else if(estado==="2"){
      this.ocupado(codigo)    
    }else if(estado==="3"){
      this.inspeccion(codigo)    
    }else if(estado==="4"){
      this.aseo(codigo)    
    }else{
      console.log(codigo)
    }
  }


  cambiarEstado(codigo,estado){
    console.log("cambia el estado a:", estado);
    this.conector.putMesa(codigo,estado) 
    .subscribe( (data:any)=>{
      console.log("actualisé",data);
      location.reload();
    })
 }



mostrar(){
  this.user = this.memoria.traerDato("usuario");
  console.log(this.user)
}


////////////////////////ALERTAS///////////////////////////
  async piezaLibre() {
    const alert = await this.alertController.create({
      header: 'Pieza Libre',
      subHeader: 'No se puede abrir la pieza',
      message: 'Solo se pueden tomar piezas para inspección o aseo.',
      buttons: ['OK']
    });

    await alert.present();
  }




  async libre(codigo:string) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Ocupar Pieza',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado(codigo,"1");
          }
        }, {
          text: 'Ocupar',
          handler: () => {
            this.cambiarEstado(codigo,"2");
          }
        }
      ]
    });

    await alert.present();
  }


  async ocupado(codigo:string) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza Ocupada',
      buttons: [
        {
          text: 'Mantener Ocupada',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado(codigo,"2");
          }
        }, {
          text: 'Inspeccionar',
          handler: () => {
            this.cambiarEstado(codigo,"3");
          }
        }
      ]
    });

    await alert.present();
  }
    
  async inspeccion(codigo:string) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: '¿Cúal es el estado de la inspección?',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado(codigo,"3");
          }
        }, {
          text: 'Lista',
          handler: () => {
            this.cambiarEstado(codigo,"4");
          }
        }
      ]
    });

    await alert.present();
  }


  async aseo(codigo:string) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza en Aseo',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado(codigo,"4");
          }
        }, {
          text: 'Lista',
          handler: () => {
            this.cambiarEstado(codigo,"1");
          }
        }
      ]
    });

    await alert.present();
  }







}



