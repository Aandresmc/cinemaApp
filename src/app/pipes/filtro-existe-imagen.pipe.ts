import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroExisteImagen'
})
export class FiltroExisteImagenPipe implements PipeTransform {

  transform(peliculas: any[] ): any {

    return peliculas.filter(pelicula =>{
      // solo mostrara el backdrop_path si existe
    // el return aplica la condicion ejemplo if(backdrop_path){} 
      return pelicula.backdrop_path;
    });
  }

}
