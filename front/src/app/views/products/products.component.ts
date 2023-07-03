import { Component, NgZone, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

import { DateInput } from 'src/app/models/date.model';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  public date: FormControl<Date | null> = new FormControl(new Date());
  public products: any = null;
  public pageInfo: any = null;

  constructor(private ngZone: NgZone, public productService: ProductsService) {}

  // Automatically fetch today's featured products
  ngOnInit(): void {
    const after = new Date();
    const before = new Date();

    before.setHours(23, 59, 59);
    this.productService.getProductsByDate(new DateInput(after, before));
  }

  // Infinite scroll, Refetch more products when user scroll to the end
  ngAfterViewInit(): void {
    this.scroller
      .elementScrolled()
      .pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 140),
        throttleTime(200)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.productService.getNextProducts('date');
        });
      });
  }

  addInput(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      // TODO: To Replace by an error handler
      throw new Error('Invalid date input value');
    }

    const before = new Date(event.value);

    before.setHours(23, 59, 59);

    this.productService.getProductsByDate(new DateInput(event.value, before));
  }
}
