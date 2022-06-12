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

  getHospital() {
    return this.http.get<any>(`${baseUrl}/hospital`).pipe(map((resp: { ok: boolean; hospitals: Hospital[] }) => resp.hospitals));
  }

  createHospital(name: string) {
    return this.http.post(`${baseUrl}/hospital`, { name });
  }

  updateHospital(id: string, name: string) {
    return this.http.put(`${baseUrl}/hospital/${id}`, { name });
  }

  deleteHospital(id: string) {
    return this.http.delete(`${baseUrl}/hospital/${id}`);
  }
}
