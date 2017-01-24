import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistogramComponent } from './histogram/histogram.component';
// import { GanttComponent } from '../shared/helpers/index';
// import { Gantt } from './gantt/gantt.component';
import { PlanningRoutingModule } from './planning-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, PlanningRoutingModule, BrowserModule, FormsModule, SharedModule.forRoot() ],
  declarations: [HistogramComponent],
  exports: [HistogramComponent]
})
export class PlanningModule { }
