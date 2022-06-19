import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { AppRoutingModule } from '../app-routing.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Charts1Component } from './charts1/charts1.component';
import { ProgressComponent } from './progress/progress.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './maintainment/users/users.component';
import { HospitalsComponent } from './maintainment/hospitals/hospitals.component';
import { PipesModule } from '../pipes/pipes.module';
import { MedicsComponent } from './maintainment/medics/medics.component';
import { MedicComponent } from './maintainment/medics/medic.component';
import { SearchComponent } from './search/search.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptors/interceptor.service';

@NgModule({
  declarations: [
    DashboardComponent,
    Charts1Component,
    ProgressComponent,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
    HospitalsComponent,
    MedicsComponent,
    MedicComponent,
    SearchComponent,
  ],
  providers: [],
  exports: [DashboardComponent, Charts1Component, ProgressComponent, PagesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgChartsModule,
    AppRoutingModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ],
})
export class PagesModule {}
