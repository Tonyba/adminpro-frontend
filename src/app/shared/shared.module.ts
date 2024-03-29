import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [BreadcrumbsComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, RouterModule, FormsModule, PipesModule],
  exports: [BreadcrumbsComponent, HeaderComponent, SidebarComponent],
})
export class SharedModule {}
