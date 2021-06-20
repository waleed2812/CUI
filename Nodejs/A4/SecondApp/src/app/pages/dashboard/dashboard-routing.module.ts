import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'edit/:id',
        pathMatch: 'full',
        component: EditComponent,
      },
      {
        path: 'add',
        pathMatch: 'full',
        component: AddComponent,
      },
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
