import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-mesa',
  templateUrl: './modal-mesa.page.html',
  styleUrls: ['./modal-mesa.page.scss'],
})
export class ModalMesaPage implements OnInit {

  constructor(public modalCtrl:ModalController) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });

 }

}
