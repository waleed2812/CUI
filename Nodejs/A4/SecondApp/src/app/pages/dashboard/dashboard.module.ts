import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { AddComponent } from './add/add.component';


@NgModule({
  declarations: [StatisticComponent, AddComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
