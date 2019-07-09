import { Component, OnInit } from '@angular/core';
import { MemoriaService } from '../services/memoria.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss'],
})
export class ConfigPage implements OnInit {

  constructor(public memoria:MemoriaService ) { }

  ngOnInit() {
  }

  conectar(url,puerto){
    console.log("url",url);
    console.log("puerto",puerto);
    this.memoria.guardarDato('memoUrl', url);
    this.memoria.guardarDato('memoPuerto', puerto);
  }




}
