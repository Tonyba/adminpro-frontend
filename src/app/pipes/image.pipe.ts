import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrL;

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(img?: string, type?: 'users' | 'medics' | 'hospitals'): unknown {
    if (!img) {
      return `https://res.cloudinary.com/digyedakq/image/upload/v1655658250/adminpro/no-image_mzlwfx.png`;
    } else if (img.includes('no-image')) {
      return `https://res.cloudinary.com/digyedakq/image/upload/v1655658250/adminpro/no-image_mzlwfx.png`;
    } else {
      return img;
    }
  }
}
