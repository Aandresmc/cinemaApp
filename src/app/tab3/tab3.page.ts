import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoritos: PeliculaDetalle[] = []

  constructor(private dataLocal: DataLocalService, private storage: Storage, private modalCtrl: ModalController) {
    this.getFavoritos()
  }



  getFavoritos() {

    // this.favoritos = await this.storage.get('peliculas')
    this.favoritos = this.dataLocal.Peliculas
    console.log(this.favoritos);

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
