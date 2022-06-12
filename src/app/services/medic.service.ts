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

  getMedics() {
    return this.http.get<any>(`${baseUrl}/medic`).pipe(map((resp: { ok: boolean; medics: Medic[] }) => resp.medics));
  }

  getMedic(id: string) {
    return this.http.get<any>(`${baseUrl}/medic/${id}`).pipe(map((resp: { ok: boolean; medic: Medic }) => resp.medic));
  }

  createMedic(medic: { name: string; hospital: string }) {
    return this.http.post(`${baseUrl}/medic`, medic);
  }

  updateMedic(medic: Medic) {
    return this.http.put(`${baseUrl}/medic/${medic.uid}`, medic);
  }

  deleteMedic(id: string) {
    return this.http.delete(`${baseUrl}/medic/${id}`);
  }
}
