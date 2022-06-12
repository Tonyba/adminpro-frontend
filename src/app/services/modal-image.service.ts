import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class ModalImageService {
  private _hideModal: boolean = true;
  type: 'users' | 'medics' | 'hospitals' = '' as 'users' | 'medics' | 'hospitals';
  id: string = '';
  img: string = '';
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  get hideModal() {
    return this._hideModal;
  }

  openModal(type: 'users' | 'medics' | 'hospitals', id: string, img: string = 'no-img') {
    this._hideModal = false;
    this.type = type;
    this.id = id;

    if (img.includes('https')) {
      this.img = img;
    } else {
      this.img = `${baseUrl}/upload/${type}/${img}`;
    }
  }

  closeModal() {
    this._hideModal = true;
  }
}
