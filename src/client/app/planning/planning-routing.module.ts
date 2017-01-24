import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HistogramComponent } from './histogram/histogram.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'planning/histogram', component: HistogramComponent }
    ])
  ],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
