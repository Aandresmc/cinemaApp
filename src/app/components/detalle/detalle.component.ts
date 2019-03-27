import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  movie:PeliculaDetalle;
  actores: Cast[] = [];
  oculto = 150;

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor( private moviesService: MoviesService,
    private modalCtrl: ModalController
   ) { }

  ngOnInit() {
    // console.log('id',this.id);
    this.getPeliculaDetalle();
    this.getActores();
  }

  getPeliculaDetalle(){
    this.moviesService.getPeliculaDetalle(this.id).subscribe(respuesta => {
    this.movie = respuesta
    });
  }


  getActores(){
    this.moviesService.getActoresPeliculaDetalle(this.id).subscribe(respuesta => {
      this.actores = respuesta.cast
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

}
