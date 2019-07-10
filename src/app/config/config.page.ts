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

  url    = '';
  puerto = '';
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
    this.conector.inicializa();

    //
    this.probarConexion();
  }



  probarConexion(){
    var usuarios:any = []
    console.log("probarConex");
    this.conector.inicializa().then( () =>  this.traerUsuarios() );
  }

  
  traerUsuarios() {
    // traigo los usuarios y
    this.conector.traeDatos('/usuarios')
        .subscribe( ( val: any ) => {
          console.log(val.datos)
          this.Aviso();
        },
        (err) => {console.log(err)
          this.Error();
        }
        );
  }


  
  
  async Aviso() {
    const toast = await this.toastCtrl.create({
      message: 'Conexion re-inicializada...' + this.puerto ,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  async Error() {
    const toast = await this.toastCtrl.create({
      message: 'Error en la conexión' + this.puerto ,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


}
