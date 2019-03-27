import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas : Movies [] = []
  
  slideOpts = {
    slidesPerView : 3.3,
    freeMode:  true,
    spaceBetween:-4
  }

  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {}

  onClick(){

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
