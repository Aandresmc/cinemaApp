import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMoviDB, PeliculaDetalle, RespuestaCredits, Genre } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const URL =  environment.url
const APIKEY = environment.apikey
@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0
  generos:Genre [] = []

  constructor(private http : HttpClient) {}

private ejecutarQuery<T>(query : string ){
  query = URL + query
  query += `&api_key=${ APIKEY }&language=es&include_language=es`
  return this.http.get<T>( query )
}


getPopulares(){
  this.popularesPage++;

  const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;
  return this.ejecutarQuery<RespuestaMoviDB>(query);

}

getNuevas(){

    const hoy =  new Date();
                       // toma el mes siguiente con el  '+1'  y  '0'  para la fecha  del ultima dia del mismo mes
    const ultimoDia = new Date ( hoy.getFullYear(),hoy.getMonth()+1,0).getDate
    
    const mes = hoy.getMonth();

    let  mesString;

    if ( mes <10 ){
      mesString = '0'+ mes;

    }else{
      mesString = mes;
    }
  
    const fechaInicio  =  `${ hoy.getFullYear() }-${ mesString }-01`
    const fechaFinal  =  `${ hoy.getFullYear() }-${ mesString }-${ultimoDia}`
    const query =`/discover/movie?primary_release_date.gte=${fechaInicio}&primary_release_date.lte=${fechaFinal}`;
    return this.ejecutarQuery<RespuestaMoviDB>(query);
  }

  getPeliculaDetalle(id:string){
    const query = `/movie/${id}?ignore=1`
    return this.ejecutarQuery<PeliculaDetalle>(query);
  }

  getActoresPeliculaDetalle(id:string){
    const query = `/movie/${id}/credits?ignore=1`
    return this.ejecutarQuery<RespuestaCredits>(query);
  }

  getBuscarPeliculas(title:string){
    const query = `/search/movie?query=${title}`
    return this.ejecutarQuery<RespuestaMoviDB>(query);
  }

  getCollections(id:string){
    // const query = `/collection/${id}?ignore=1`;
    const query = `/movie/${id}/images?ignore=1`
    return this.ejecutarQuery(query);
  }

  
  cargarGeneros(): Promise<Genre[]> {
    // https://api.themoviedb.org/3/genre/movie/list?api_key=1865f43a0549ca50d341dd9ab8b29f49&language=es&include_image_language=es
    return new Promise( resolve => {

      this.ejecutarQuery(`/genre/movie/list?ignore=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          resolve(this.generos);
        });

    });


  }
}
