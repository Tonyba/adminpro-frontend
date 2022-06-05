import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetUser } from '../interfaces/get-users.interface';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

const baseUrl = environment.baseUrL;

@Injectable({
  providedIn: 'root',
})
export class SearchService {
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

  private transformUsers(results: any[]): User[] {
    return results.map((user) => new User(user.name, user.email, '', user.img, user.role, user.google, user.uid));
  }

  search(type: 'user' | 'medic' | 'hospital', term: string) {
    return this.http.get<any[]>(`${baseUrl}/all/collection/${type}/${term}`, this.headers).pipe(
      map((resp: any) => {
        switch (type) {
          case 'user':
            return this.transformUsers(resp.results);
            break;

          case 'hospital':
            return;
            break;

          case 'medic':
            return;
            break;

          default:
            return [];
            break;
        }
      })
    );
  }
}
