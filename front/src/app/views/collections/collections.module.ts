import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [CommonModule, CollectionsRoutingModule, MatSnackBarModule, MatProgressSpinnerModule, PieChartComponent],
})
export class CollectionsModule {}
