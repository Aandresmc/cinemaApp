import { Component, OnInit, Input } from '@angular/core';
import { Movies } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-slideshow-backgrop',
  templateUrl: './slideshow-backgrop.component.html',
  styleUrls: ['./slideshow-backgrop.component.scss'],
})
export class SlideshowBackgropComponent implements OnInit {

  @Input() peliculas : Movies [] = []

  slideOpts = {
    slidesPerView : 1.3,
    // freeMode:  true
    // spaceBetween:-10
  }
  
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
   
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
