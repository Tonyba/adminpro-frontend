import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Medic } from '../models/medic.model';

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  constructor(private http: HttpClient) {}

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers(): Object {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  getMedics() {
    return this.http.get<any>(`${baseUrl}/medic`, this.headers).pipe(map((resp: { ok: boolean; medics: Medic[] }) => resp.medics));
  }

  getMedic(id: string) {
    return this.http.get<any>(`${baseUrl}/medic/${id}`, this.headers).pipe(map((resp: { ok: boolean; medic: Medic }) => resp.medic));
  }

  createMedic(medic: { name: string; hospital: string }) {
    return this.http.post(`${baseUrl}/medic`, medic, this.headers);
  }

  updateMedic(medic: Medic) {
    return this.http.put(`${baseUrl}/medic/${medic.uid}`, medic, this.headers);
  }

  deleteMedic(id: string) {
    return this.http.delete(`${baseUrl}/medic/${id}`, this.headers);
  }
}
