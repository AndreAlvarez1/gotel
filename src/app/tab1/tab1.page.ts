import { Component, OnInit} from '@angular/core';
import { MemoriaService } from '../services/memoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  user = undefined;

  constructor(public memoria: MemoriaService,
              private router: Router) {}

  ngOnInit() {
    // último usuario
    this.memoria.leerDato('gotel_usuario').then( dato => this.user = dato );
  }

  irPiezas() {
    this.router.navigateByUrl('/tabs/tab2');
  }

}
