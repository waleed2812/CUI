import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  {
    path: 'add',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AddComponent,
      },
    ],
  },
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: StatisticComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
