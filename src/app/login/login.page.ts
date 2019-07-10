import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ConectorService } from '../services/conector.service';
import { MemoriaService } from '../services/memoria.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public usuarios = [];
  public user     = undefined;
  public url      = undefined;
  public pass     = '';

  constructor(private router: Router,
              private alertController: AlertController,
              public conector: ConectorService,
              private memoria: MemoriaService ) {
    // último usuario
    this.memoria.leerDato('gotel_usuario')
        .then( dato => this.user = dato );
  }

  ngOnInit() {
    // esta se me ocurrió de shiripa....
    // llamo primero a las variables... buenas o no....
    // y una vez que se obtienen se llama a los usuarios...
    // shúpate esa !!!
    this.conector.inicializa().then( () => this.traerUsuarios() );
 }

  checkPass(pass) {
    // console.log('chequeo el pass', pass);
    const user = this.usuarios.find( ( usr: any ) => usr.CLAVE === pass );
    // console.log(user);
    if (user) {
      // console.log( 'guardando...', user );
      this.memoria.guardarDato('gotel_usuario', user);
      this.router.navigateByUrl('/tabs/tab1');
    } else {
      this.alertaError();
    }
  }

  traerUsuarios() {
    // traigo los usuarios y
    this.conector.traeDatos('/usuarios')
        .subscribe( ( val: any ) => {
            // // console.log('traerUsuarios()', val );
            // let i; // arreglo el formato del código borrando los espacios libres
            // for ( i = 0; i < val.datos.length; i++) {
            //     val.datos[i].CLAVE = val.datos[i].CLAVE.replace(/\s/g, '');
            // }
            return this.usuarios = val.datos;
        });
  }

  config() {
      // console.log('voy a config');
      this.router.navigateByUrl('/config');
  }

  async alertaError() {
    const alert = await this.alertController.create({
      header: 'Ups',
      subHeader: 'Error en la contraseña',
      message: 'Intenta de nuevo por favor...',
      buttons: ['OK']
    });
    await alert.present();
  }

}
