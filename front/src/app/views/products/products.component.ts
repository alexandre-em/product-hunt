import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { DateInput } from 'src/app/models/date.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  public picker: DateInput | null = null;
  public products: any = null;
  public pageInfo: any = null;

  constructor(public productService: ProductsService) {}

  addInput(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      // TODO: To Replace by an error handler
      throw new Error('Invalid date input value');
    }

    const before = new Date(event.value);

    before.setHours(23, 59, 59);

    this.picker = new DateInput(event.value, before);
  }

  getFormData(): void {
    if (!this.picker) {
      throw new Error('There is no date selected');
    }
    this.productService.getProductsByDate(this.picker);
  }
}
