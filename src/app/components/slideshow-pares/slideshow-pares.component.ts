import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movies } from 'src/app/interfaces/interfaces';
import { DetalleComponent } from '../detalle/detalle.component';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Movies[] = []
  @Output() masPeliculas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -4
  }
  lookSpinner = false

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  async cargarMas() {
    this.lookSpinner = true;
    await this.masPeliculas.emit();
    setTimeout(() => {
      this.lookSpinner = false
    }, 470);

  }

  async verPelicula(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
