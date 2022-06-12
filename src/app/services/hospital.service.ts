import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { map } from 'rxjs/operators';

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class HospitalService {
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

  getHospital() {
    return this.http
      .get<any>(`${baseUrl}/hospital`, this.headers)
      .pipe(map((resp: { ok: boolean; hospitals: Hospital[] }) => resp.hospitals));
  }

  createHospital(name: string) {
    return this.http.post(`${baseUrl}/hospital`, { name }, this.headers);
  }

  updateHospital(id: string, name: string) {
    return this.http.put(`${baseUrl}/hospital/${id}`, { name }, this.headers);
  }

  deleteHospital(id: string) {
    return this.http.delete(`${baseUrl}/hospital/${id}`, this.headers);
  }
}
