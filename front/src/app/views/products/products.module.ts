import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ListComponent } from 'src/app/components/list/list.component';

@NgModule({
  declarations: [ProductsComponent],
  imports: [CommonModule, ProductsRoutingModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, ListComponent],
})
export class ProductsModule {}
