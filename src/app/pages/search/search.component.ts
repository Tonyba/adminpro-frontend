import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Medic } from '../../models/medic.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  users: User[] = [];
  medics: Medic[] = [];
  hospitals: Hospital[] = [];

  constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ term }) => {
      this.globalSearch(term);
    });
  }

  globalSearch(term: string) {
    this.searchService.searchAll(term).subscribe(({ users, medics, hospitals }: any) => {
      this.users = users;
      this.medics = medics;
      this.hospitals = hospitals;
    });
  }
}
