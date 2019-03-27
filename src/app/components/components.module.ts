import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { IonicModule } from '@ionic/angular';
import { SlideshowBackgropComponent } from './slideshow-backgrop/slideshow-backgrop.component';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  //significa que puede crearse dinamicamente mediante angular, para los modales
  entryComponents: [
    DetalleComponent
  ],
  declarations: [
    SlideshowBackgropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent,
  ],
  exports: [
    SlideshowBackgropComponent,
    SlideshowPosterComponent,
    SlideshowParesComponent,
    DetalleComponent,
  ],
  imports: [
    CommonModule,
    //se importo IonicModule para las directivas de card, grid etc.
    IonicModule,
    //se importo PipesModule para utilizarlos en las imagenes
    PipesModule
  ]
})
export class ComponentsModule { }
