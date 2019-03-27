import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';


const URL  = environment.imgPath;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  

  transform(img: string, size: string): string {
   
    if(!img){
      return 
    }
   const imgUrl = `${ URL }/${ size }/${ img }`
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

  // console.log('image',imgUrl);
  
    return imgUrl;
  }

}
