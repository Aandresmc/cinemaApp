import { Component, OnInit, Input } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { PeliculaDetalle, Cast } from 'src/app/interfaces/interfaces';
import { ModalController, Platform, ToastController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

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
  lookSpinner = false

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };

  constructor(
    private moviesService: MoviesService,
    private modalCtrl: ModalController,
    private dataLocal: DataLocalService,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private ToastController: ToastController

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



  async compartir() {
    this.lookSpinner = true
    setTimeout(async () => {
      let message = "compartiendo pelicula...."
      if (this.platform.is('cordova')) {
        //is mobile
        await this.socialSharing.share(
          this.movie.title,
          this.movie.title,
          '',
          this.movie.homepage
        )

        this.presentToast(message);
        this.lookSpinner = false
      }
      else {
        if (navigator['share']) {
          await navigator['share']({
            title: this.movie.title,
            text: this.movie.title,
            url: this.movie.homepage,
          })
            .then(() => {
              this.presentToast(message)
              this.lookSpinner = false
            })
            .catch((error) => this.presentToast(error));
        }
        else {
          let message = 'No esta soportado el share por tu navegador';
          this.presentToast(message);
          this.lookSpinner = false
        }
      }
    }, 350);

  }

  async  presentToast(message) {
    const toast = await this.ToastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
      closeButtonText: 'salir',
      mode:'ios'
    });
    return toast.present();
  }

}
