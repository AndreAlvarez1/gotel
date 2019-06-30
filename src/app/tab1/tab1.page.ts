import { Component, OnInit} from '@angular/core';
import { MemoriaService } from '../services/memoria.service';
import { Router } from '@angular/router';
import { Storage } from "@ionic/storage";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public user:any

  constructor(public memoria:MemoriaService,
              private router:Router) {
 
  }   


  ngOnInit() { 
    this.user = this.memoria.leerDato("usuario")
  }

  irPiezas(){
    this.router.navigateByUrl('/tabs/tab2');
  }

 


   


}

