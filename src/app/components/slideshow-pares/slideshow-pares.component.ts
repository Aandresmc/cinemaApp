import { Component, OnInit, Input, Output ,EventEmitter } from '@angular/core';
import { Movies } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas : Movies [] = []
  @Output() masPeliculas =  new EventEmitter();
  
  slideOpts = {
    slidesPerView : 3.3,
    freeMode:  true,
    spaceBetween:-4
  }
  
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  cargarMas(){
    this.masPeliculas.emit();
  }

  async verPelicula(id: string){
    const modal = await this.modalCtrl.create({
    component:DetalleComponent,
    componentProps:{
      id
    }
    });

    modal.present();
  }

}
