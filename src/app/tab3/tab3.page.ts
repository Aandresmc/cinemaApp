import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoritos: PeliculaDetalle[] = []
  generos: Genre[] = []
  favoritoGenero: any[] = [];

  slideOpts = {
    slidesPerView: 3.3,
    spaceBetween: -4
  }

  constructor(private movieService: MoviesService, private dataLocal: DataLocalService) { }

  async ionViewWillEnter() {
    this.getFavoritos()
    this.getCategorias()
    await this.pelisPorGenero(this.generos, this.favoritos)

  }

  async getFavoritos() {
    this.favoritos = await this.dataLocal.cargarFavoritos()
  }

  async getCategorias() {
    this.generos = await this.movieService.cargarGeneros()
  }


  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {


    this.favoritoGenero = [];

    generos.forEach(genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter(peli => {
          return peli.genres.find(genre => genre.id === genero.id);
        })
      });

    });
  }


}
