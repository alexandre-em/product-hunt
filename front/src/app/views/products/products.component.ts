import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

import { DateInput } from 'src/app/models/date.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  public date: FormControl<Date | null> = new FormControl(new Date());

  constructor(
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    public readonly productService: ProductsService,
    public readonly errorService: ErrorService
  ) {}

  // Automatically fetch today's featured products
  ngOnInit(): void {
    const after = new Date();
    const before = new Date();

    before.setHours(23, 59, 59);
    this.productService.getProductsByDate(new DateInput(after, before), (err) => this._snackBar.open(err.message, 'CLOSE'));
  }

  // Infinite scroll, Refetch more products when user scroll to the end
  ngAfterViewInit(): void {
    try {
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
            this.productService.getNextProducts('date', (err) => this._snackBar.open(err.message, 'CLOSE'));
          });
        });
    } catch (e: any) {
      this.errorService.handleError(e);
      this._snackBar.open('An error occured, please try again later', 'CLOSE');
    }
  }

  addInput(event: MatDatepickerInputEvent<Date>): void {
    if (!event.value) {
      const err = new Error('Invalid date input value');
      this.errorService.handleError(err);
      this._snackBar.open('Invalid date input value', 'CLOSE');
      return;
    }

    const before = new Date(event.value);

    before.setHours(23, 59, 59);

    this.productService.getProductsByDate(new DateInput(event.value, before), (err) => this._snackBar.open(err.message, 'CLOSE'));
  }
}
