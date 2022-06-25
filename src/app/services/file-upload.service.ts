import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

const base_url = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(private userService: UserService) {}

  async updatePhoto(file: File, type: 'users' | 'medics' | 'hospitals', id: string) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('image', file);

      const resp = await fetch(url, {
        headers: { 'x-token': this.userService.token },
        method: 'PUT',
        body: formData,
      });

      const data = await resp.json();

      if (data.ok) {
        return data.img;
      } else {
        console.log(data.msg);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
