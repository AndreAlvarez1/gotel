import { Component, OnInit } from '@angular/core';
import { ConectorService } from '../services/conector.service';
import { FechasService } from '../services/fechas.service';
import { ModalController } from '@ionic/angular';
import { ModalMesaPage } from '../components/modal-mesa/modal-mesa.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  fechaAhora  = new Date().toString();
  fechaModif  = undefined;
  fechaSelect = undefined;
  mostrar     = false;

  actividades = [];
  loading: boolean;

  constructor( private conector: ConectorService,
               private fechas: FechasService,
               public modalController: ModalController) {
      this.formatoUno(this.fechaAhora);
      this.loading = true;
  }


  ngOnInit() {
    this.conector.inicializa().then( () =>  this.traerActividades( this.fechas.fechaHoy, this.fechas.fechaHoy ) );
  }



  traerActividades( fechaIni, fechaFin ) {
      this.conector.getActividadDia(fechaIni, fechaFin )
          .subscribe(( val: any ) => {
              console.log(val.datos);
              this.actividades = val.datos;
              this.loading = false;
          });
  }

  buscarFecha( fecha ) {
      this.fechas.formatoFechaDos(fecha);
      console.log(this.fechas.fechaModif);
      this.traerActividades( this.fechas.fechaModif, this.fechas.fechaModif );
  }

  formatoUno( fecha ) {
      this.fechas.formatoFechaUno( fecha );
  }

  formatoDos( fecha ) {
      this.fechas.formatoFechaDos( fecha );
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async presentModal( actividad: any ) {
    const modal = await this.modalController.create({
      component: ModalMesaPage,
      componentProps: {
        mesa:    actividad.MESA,
        usuario: actividad.NOMBRE,
        estado:  actividad.ESTADO,
        fecha:   actividad.FECHA.slice( 0, 10 ),
        hora:    actividad.HORA_FIN
      }
    });
    return await modal.present();
  }

}
