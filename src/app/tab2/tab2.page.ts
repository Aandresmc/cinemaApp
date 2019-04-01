import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movies } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private modalCtrl: ModalController, private _serviceMovie: MoviesService) { }

  ngOnInit() {
    this.getRecomendaciones()
  }
  textoBuscar: String = "";
  resultados: Movies[] = []
  recomendaciones: Movies[] = []
  buscando = false;



  buscar(busqueda: string) {
    this.buscando = true;
    setTimeout(() => {
      if (busqueda != "") {
        this._serviceMovie.getBuscarPeliculas(busqueda).
          subscribe(respuesta => {
            this.resultados = [...respuesta.results]

            this.buscando = false;
          });
      } else {
        this.buscando = false;
        this.resultados = []
      }
    }, 300);
  }

  getRecomendaciones() {
    this._serviceMovie.getPopulares().subscribe(respuesta => {
      this.recomendaciones = [...respuesta.results].slice(0, 4)


    })
  }

  activeRecomendacion(recomendacion: string) {
    this.textoBuscar = recomendacion
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
