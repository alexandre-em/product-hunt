import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [CollectionsComponent],
  imports: [CommonModule, CollectionsRoutingModule, NgChartsModule, MatSnackBarModule, MatProgressSpinnerModule],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } }],
})
export class CollectionsModule {}
