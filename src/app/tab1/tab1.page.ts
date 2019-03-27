import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../interfaces/interfaces';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  nuevasPeliculas: Movies[] = []
  peliculasPopulares: Movies[] = []
  constructor(private _serviceMovie: MoviesService) {

  }

  ngOnInit() {
    this.getNuevas()

    this.getPopulares()

    var width = window.innerWidth;
    // console.log('Alto-->' + width);
  }

  getNuevas() {
    this._serviceMovie.getNuevas().subscribe(respuesta => {
      //  console.log('nuevas',respuesta);
      this.nuevasPeliculas = respuesta.results;
    });
  }

  getPopulares() {
    this._serviceMovie.getPopulares().subscribe(respuesta => {
      // console.log('populares',respuesta);
      // se crea el array temporal para poder  decir ha angular que todo
      // el arreglo peliculasPopulares cambio ya que el pipe no es asincrono
      let arrTemp = [...this.peliculasPopulares,...respuesta.results]
      this.peliculasPopulares = arrTemp;
    })
  }

  cargarMasPopulares() {
    this.getPopulares()
  }
}
