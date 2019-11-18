import { Component, OnInit } from '@angular/core';
import { MemoriaService } from '../services/memoria.service';
import { ConectorService } from '../services/conector.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  url    = 'http://motelelpaso.ddns.net';
  puerto = 3060;
  public usuarios = [];

  constructor(  public memoria: MemoriaService,
                public conector: ConectorService,
                private toastCtrl: ToastController ) { }

  ngOnInit() {
    this.memoria.leerDato('gotel_url'   ).then( ( dato: any ) => this.url = dato );
    this.memoria.leerDato('gotel_puerto').then( ( dato: any ) => this.puerto = dato );
  }



  conectar() {
    // se guardan los datos...
    this.memoria.guardarDato('gotel_url',    this.url   );
    this.memoria.guardarDato('gotel_puerto', this.puerto);
    // y se re-inicializa la conexion....
    this.conector.inicializa().then( () => this.probarConexion() );

    //

  }



  probarConexion() {
    let usuarios: any = [];
    console.log('probarConex');
    this.conector.inicializa().then( () =>  this.traerUsuarios() );
  }


  traerUsuarios() {
    // traigo los usuarios y
    this.conector.traeDatos('/usuarios')
        .subscribe( ( val: any ) => {
          console.log(val.datos);
          console.log(val.datos.length );

          if ( val.datos.length > 0) {
            this.Aviso('Hay usuarios');
          } else {
            this.Aviso('conectado, no se encontraron usuarios');
          }
        },
        (err) => {console.log(err);
                  this.Error();
        }
        );
  }



  async Aviso(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje + ' ' + this.puerto ,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async Error() {
    const toast = await this.toastCtrl.create({
      message: 'Error en la conexión ' + this.puerto ,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


}
