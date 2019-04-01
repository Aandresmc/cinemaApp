import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { FiltroExisteImagenPipe } from './filtro-existe-imagen.pipe';

@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    FiltroExisteImagenPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    FiltroExisteImagenPipe
  ]
})
export class PipesModule { }
