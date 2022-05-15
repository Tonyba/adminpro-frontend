import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'Dashboard',
        },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: {
          title: 'progress',
        },
      },
      {
        path: 'charts1',
        component: Charts1Component,
        data: {
          title: 'charts1',
        },
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'account-settings',
        },
      },
      {
        path: 'promises',
        component: PromisesComponent,
        data: {
          title: 'promises',
        },
      },
      {
        path: 'observable',
        component: RxjsComponent,
        data: {
          title: 'observable',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PagesRoutingModule {}
