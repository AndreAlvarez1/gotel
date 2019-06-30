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

  public usuarios:any[]=[];
  public user:any;


  constructor(private router:Router,
              public alertController:AlertController,
              private conector:ConectorService,
              public memoria:MemoriaService ) { 
                this.traerUsuarios()
  }

  ngOnInit() {
    this.user = this.memoria.leerDato("usuario")
  }

  checkPass(pass){
    console.log("chequeo el pass",pass)
     const user = this.usuarios.find( user => user.CLAVE === pass)
     console.log(user)
     if(user){
        this.memoria.guardarDato("usuario",user)
        this.router.navigateByUrl('/tabs/tab1');
      }else{
        this.alertaError()
      }
  }

  

  
  traerUsuarios(){
    //traigo los usuarios y 
    this.conector.traeDatos("/usuarios")
    .subscribe(val=>{
        console.log(val);
        var i; //arreglo el formato del código borrando los espacios libres
        for( i=0; i < val["datos"].length; i++){
          val["datos"][i].CLAVE = val["datos"][i].CLAVE.replace(/\s/g, '');
          //datos.datos[i].NOMBRE = datos.datos[i].NOMBRE.replace(/\s/g, '');
        }
      return this.usuarios=val["datos"];
    })
  }

  

  async alertaError() {
    const alert = await this.alertController.create({
      header: 'Ups',
      subHeader: 'Error en la contraseña',
      message: 'Prueba de nuevo por favor.',
      buttons: ['OK']
    });

    await alert.present();
  }












}
