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

  public mesas: any[] = [];
  public loading: boolean;
  public user: any;
  public memNumero: number;

  fechaSelect = new Date().toString();
  fechaModif  = undefined;

  constructor(public conector: ConectorService,
              public alertController: AlertController,
              public memoria: MemoriaService,
              public fechas: FechasService ) {

    this.loading = true;
    this.fechas.formatoFechaUno( this.fechaSelect );

  }

  ngOnInit() {
    this.conector.inicializa().then( () =>  this.traerMesas() );
    this.memoria.traerDato( 'gotel_usuario' ).then( data => this.user = data );
  }

  // traerMesas() {
  //   console.log('tengo url tab2', this.conector.url);

  //   this.conector.traeDatos('/mesasyusuarios')
  //   .subscribe( ( val: any ) => {
  //       console.log(val.datos);
  //       let i; // arreglo el formato del código borrando los espacios libres
  //       for ( i = 0; i < val.datos.length; i++) {
  //         val.datos[i].ESTADO = val.datos[i].ESTADO.replace(/\s/g, '');
  //         if ( val.datos[i].ESTADO === '2' || val.datos[i].ESTADO === '5' ) {
  //             val.datos[i].CODIGO = val.datos[i].CODIGO.replace(/\s/g, '');
  //             this.mesas.push(val.datos[i]);
  //         }
  //       }
  //       console.log(this.mesas);
  //       this.loading = false;
  //   });
  // }

  traerMesas() {
    console.log('tengo url tab2', this.conector.url);

    this.conector.traeDatos('/mesasyusuarios')
    .subscribe( ( val: any ) => {
        console.log('datos', val.datos);
        let i;

        for ( i = 0; i < val.datos.length; i++) {
          // arreglo el formato del código borrando los espacios libres
          val.datos[i].ESTADO = val.datos[i].ESTADO.replace(/\s/g, '');

          // Traigo solo las mesas que necesitan ver las personas en la app
          if (this.verificaMesa(val.datos[i].ESTADO) ) {
            val.datos[i].CODIGO = val.datos[i].CODIGO.replace(/\s/g, '');
            this.mesas.push(val.datos[i]);
          }
        }

        console.log('mesas', this.mesas);
        this.loading = false;
    });
  }

  verificaMesa(codigo) {
    console.log('codigo', codigo);
    if (codigo === "1") {
      return false;
    } else if (codigo === "3") {
      return false;
    } else if (codigo === "4") {
      return false;
    } else {
      return true;
    }
  }

  abrirMesa( codigo: string, estado: string, numero: number ) {
    this.memNumero = numero;
    if ( estado === '1') {
      // this.piezaLibre()
      this.libre( codigo );
    } else if ( estado === '3' ) {
      this.ocupado( codigo );
    } else if ( estado === '4' ) {
      this.consumir( codigo );
    } else if ( estado === '2' ) {
      this.inspeccion( codigo );
    } else if ( estado === '7' ) {
      this.inspeccionar( codigo );
    } else if ( estado === '5' ) {
      this.aseo( codigo );
    } else if ( estado === '6' ) {
      this.hacerAseo( codigo );
    } else {
      console.log(codigo);
    }
  }

  cambiarEstado( codigo: any, estado: any, usuario: any ) {
    console.log('cambia el estado a:', estado, 'con el usuario', usuario);
    this.llenarActividad( codigo, estado, usuario );
    this.conector.putMesa (codigo, estado, usuario )
        .subscribe( ( data: any ) => {
          console.log('actualizé', data );
          location.reload();
        });
  }

  llenarActividad( codigo: string, estado: number, numero: number ) {
    if ( this.memNumero === undefined ) {
        this.actividad.numero = 0;
    } else {
        this.actividad.numero = this.memNumero;
    }
    this.actividad.mesa       = codigo;
    this.actividad.usuario    = this.user.CODIGO;
    this.actividad.cod_accion = estado;
    this.actividad.fecha      = this.fechas.fechaHoy;
    this.actividad.hora_ini   = this.fechas.horaModif;
    this.actividad.hora_fin   = this.fechas.horaModif;
    //
    console.log('llené la bd');
    console.log('Actividad', this.actividad );
    //
    this.insertarDato(this.actividad);
    //
  }

  insertarDato( actividad ) {
    this.conector.putActividad( actividad )
        .subscribe( ( data: any ) => {
        console.log( 'Grabé', data );
    });
  }

  doRefresh(event) {
    this.mesas = [];
    this.traerMesas();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  //////////////////////// ALERTAS ///////////////////////////
  async piezaLibre() {
    const alert = await this.alertController.create({
      header: 'Pieza Libre',
      subHeader: 'No se puede abrir la pieza',
      message: 'Solo se pueden tomar piezas para inspección o aseo.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async libre( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Ocupar Pieza',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '1', this.user.CODIGO );
          }
        },
        {
          text: 'Ocupar',
          handler: () => {
            this.cambiarEstado( codigo, '3', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async ocupado( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza Ocupada',
      buttons: [
        {
          text: 'Mantener Ocupada',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '3', this.user.CODIGO );
          }
        },
        {
          text: 'Consumir',
          handler: () => {
            this.cambiarEstado( codigo, '4', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async consumir( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Consumiendo',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '4', this.user.CODIGO );
          }
        },
        {
          text: 'Inspeccionar',
          handler: () => {
            this.cambiarEstado( codigo, '2', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async inspeccion( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Tomar Pieza para inspección',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '2', this.user.CODIGO );
          }
        },
        {
          text: 'Tomar Pieza',
          handler: () => {
            this.cambiarEstado( codigo, '7', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async inspeccionar( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza inspeccionada?',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '7', this.user.CODIGO );
          }
        },
        {
          text: 'OK, Pieza inspeccionada',
          handler: () => {
            this.cambiarEstado( codigo, '5', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async aseo( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza para hacer aseo ',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '5', this.user.CODIGO );
          }
        },
        {
          text: 'Tomar pieza',
          handler: () => {
            this.cambiarEstado( codigo, '6', this.user.CODIGO );
          }
        }
      ]
    });
    await alert.present();
  }

  async hacerAseo( codigo: string ) {
    const alert = await this.alertController.create({
      header: 'Pieza' + ' ' + codigo,
      message: 'Pieza en Aseo',
      buttons: [
        {
          text: 'Pendiente',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.cambiarEstado( codigo, '6', this.user.CODIGO );
          }
        },
        {
          text: 'Lista',
          handler: () => {
            this.cambiarEstado( codigo, '1', " " );
          }
        }
      ]
    });
    await alert.present();
  }

}
