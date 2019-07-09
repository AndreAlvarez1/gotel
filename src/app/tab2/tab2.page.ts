import { Component, OnInit } from '@angular/core';
import { ConectorService } from '../services/conector.service';
import { AlertController } from '@ionic/angular';
import { MemoriaService } from '../services/memoria.service';
import { FechasService } from '../services/fechas.service';
import { ActividadModel } from '../models/actividad.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  actividad = new ActividadModel();

  public mesas:any[]=[];
  public loading:boolean;
  public user: any;
  public memNumero:number;
          fechaSelect:string = new Date().toString();
          fechaModif:string;



  constructor(private conector:ConectorService,
              public alertController: AlertController,
              public memoria:MemoriaService,
              public fechas:FechasService) {

              this.loading=true;
              this.fechas.formatoFechaUno(this.fechaSelect)
              this.traerMesas();

  }


  ngOnInit() {
    this.memoria.traerDato( 'gotel_usuario' ).then( data => this.user = data );

  }

  traerMesas(){ 
    this.conector.traeDatos("/mesasyusuarios")
    .subscribe(val=>{
        console.log(val["datos"]);
        var i; //arreglo el formato del código borrando los espacios libres
        for( i=0; i < val["datos"].length; i++){
          val["datos"][i].ESTADO = val["datos"][i].ESTADO.replace(/\s/g, ''); 
          val["datos"][i].CODIGO = val["datos"][i].CODIGO.replace(/\s/g, ''); 
            }
        this.mesas=val["datos"];
        this.loading=false;
    })
  }

  abrirMesa(codigo:string, estado:string,numero:number){
    this.memNumero = numero;

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


  cambiarEstado(codigo,estado,usuario){
    console.log("cambia el estado a:", estado, "con el usuario", usuario);

        this.llenarActividad(codigo,estado,usuario);

        this.conector.putMesa(codigo,estado,usuario) 
        .subscribe( (data:any)=>{
          console.log("actualisé",data);
          location.reload();
        })
 }

 llenarActividad(codigo:string,estado:number,numero:number){
   this.actividad.mesa = codigo;
   
   if(this.memNumero===undefined){
    this.actividad.numero = 0;
   }else{
    this.actividad.numero = this.memNumero;
   }

   this.actividad.usuario = this.user.CODIGO;
   this.actividad.cod_accion = estado;   
   this.actividad.fecha = this.fechas.fechaHoy;
   this.actividad.hora_ini = this.fechas.horaModif;
   this.actividad.hora_fin = this.fechas.horaModif;

   console.log("llené la bd");
   console.log("Actividad",this.actividad);

   this.insertarDato(this.actividad);
 }





  insertarDato(actividad){
    this.conector.putActividad(actividad) 
    .subscribe( (data:any)=>{
      console.log("Grabé",data);
    })
  }




doRefresh(event) {
  console.log('Begin async operation');
  this.traerMesas();

  setTimeout(() => {
    console.log('Async operation has ended');
    event.target.complete();
  }, 2000);
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
            this.cambiarEstado(codigo,"1",this.user.CODIGO);
          }
        }, {
          text: 'Ocupar',
          handler: () => {
            this.cambiarEstado(codigo,"2",this.user.CODIGO);
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
            this.cambiarEstado(codigo,"2",this.user.CODIGO);
          }
        }, {
          text: 'Inspeccionar',
          handler: () => {
            this.cambiarEstado(codigo,"3",this.user.CODIGO);
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
            this.cambiarEstado(codigo,"3",this.user.CODIGO);
          }
        }, {
          text: 'Lista',
          handler: () => {
            this.cambiarEstado(codigo,"4",this.user.CODIGO);
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
            this.cambiarEstado(codigo,"4",this.user.CODIGO);
          }
        }, {
          text: 'Lista',
          handler: () => {
            this.cambiarEstado(codigo,"1",this.user.CODIGO);
          }
        }
      ]
    });

    await alert.present();
  }







}



