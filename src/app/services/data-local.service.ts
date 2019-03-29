import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  constructor(private storage: Storage, private toastCtrl: ToastController) { }

  Peliculas: PeliculaDetalle[] = []

  guardarPelicula(movie: PeliculaDetalle) {

    let mensaje;
    let existe = false;
    for (const pelicula of this.Peliculas) {
      if (pelicula.id === movie.id) {
        existe = true;
        break;
      }
    }
    if (!existe) {

      this.Peliculas.push(movie);

      this.storage.set('peliculas', this.Peliculas)

      mensaje = `se agrego ${movie.title} a favoritos!`
      
    } else {
      mensaje = "ya se encuentra en favoritos..."

    }

    this.presentToast(mensaje)
  }

  async presentToast(mensaje) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

}

