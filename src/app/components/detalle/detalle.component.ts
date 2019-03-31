import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  favoritos: PeliculaDetalle[] = []
  movie: PeliculaDetalle;
  actores: Cast[] = [];
  oculto = 150;
  icon = 'heart-empty';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,

  ) { }

  ngOnInit() {

    this.getPeliculaDetalle();
    this.getActores();
    // this.getImages()
    this.getFavoritos()

  }

  getPeliculaDetalle() {
    this.moviesService.getPeliculaDetalle(this.id).subscribe(respuesta => {
      this.movie = respuesta
    });
  }


  getActores() {
    this.moviesService.getActoresPeliculaDetalle(this.id).subscribe(respuesta => {
      this.actores = respuesta.cast
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
  }

  addFavoritos() {
    this.dataLocal.guardarPelicula(this.movie);
    this.icon = 'heart'
  }

  getImages() {
    this.moviesService.getCollections(this.id).subscribe(respuesta => {

    });
  }


  getFavoritos() {

    this.favoritos = this.dataLocal.Peliculas

    const isFavorite = this.favoritos.find(favorite => favorite.id === this.id);
    isFavorite ? this.icon = 'heart' : 'heart-empty';

  }

}
