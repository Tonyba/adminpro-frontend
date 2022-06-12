import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUser } from '../interfaces/get-users.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Hospital } from '../models/hospital.model';
import { Observable } from 'rxjs';
import { Medic } from '../models/medic.model';

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private transformUsers(results: any[]): User[] {
    return results.map((user) => new User(user.name, user.email, '', user.img, user.role, user.google, user.uid));
  }

  private tranformHospitals(results: any[]): Hospital[] {
    return results;
  }

  private tranformMedics(results: any[]): Medic[] {
    return results;
  }

  searchAll(term: string) {
    return this.http.get(`${baseUrl}/all/${term}`);
  }

  search(type: 'user' | 'medic' | 'hospital', term: string): Observable<any> {
    return this.http.get<any[]>(`${baseUrl}/all/collection/${type}/${term}`).pipe(
      map((resp: any) => {
        switch (type) {
          case 'user':
            return this.transformUsers(resp.results);

          case 'hospital':
            return this.tranformHospitals(resp.results);

          case 'medic':
            return this.tranformMedics(resp.results);

          default:
            return [];
        }
      })
    );
  }
}
