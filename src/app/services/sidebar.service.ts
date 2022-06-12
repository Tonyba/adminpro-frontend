import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'Charts', url: '/dashboard/charts1' },
  //       { title: 'ProgressBar', url: '/dashboard/progress' },
  //       { title: 'Promises', url: '/dashboard/promises' },
  //       { title: 'Observable', url: '/dashboard/observable' },
  //     ],
  //   },

  //   {
  //     title: 'Maintenance',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: '/dashboard/users' },
  //       { title: 'Hospitals', url: '/dashboard/hospitals' },
  //       { title: 'Medics', url: '/dashboard/medics' },
  //     ],
  //   },
  // ];

  menu: any[] = [];

  constructor() {}

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }
}
