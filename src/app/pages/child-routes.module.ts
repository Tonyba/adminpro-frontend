import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { Charts1Component } from './charts1/charts1.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintainment/users/users.component';
import { HospitalsComponent } from './maintainment/hospitals/hospitals.component';
import { MedicsComponent } from './maintainment/medics/medics.component';
import { MedicComponent } from './maintainment/medics/medic.component';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [
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
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      title: 'Profile',
    },
  },

  //Mantainment
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AdminGuard],
    data: {
      title: 'Users Maintenance',
    },
  },

  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: {
      title: 'Hospitals Maintenance',
    },
  },

  {
    path: 'medics',
    component: MedicsComponent,
    data: {
      title: 'Medics Maintenance',
    },
  },
  {
    path: 'medic/:id',
    component: MedicComponent,
    data: {
      title: 'Medic Maintenance',
    },
  },

  {
    path: 'search/:term',
    component: SearchComponent,
    data: {
      title: 'Search',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
