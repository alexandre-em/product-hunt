import { AfterViewInit, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, pairwise, filter, throttleTime } from 'rxjs/operators';

import { DateInput } from 'src/app/models/date.model';
import { ProductsService } from 'src/app/services/products/products.service';
import { ErrorService } from 'src/app/services/error/error.service';
import { LoggerService } from 'src/app/services/logger/logger.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  public selectedDate: DateInput | null = null;
  public productList: Array<Partial<IEdge<PostType>>> = [];
  public currentPageInfo: IPageInfo | null = null;
  public isLoading = false;
  private subscriptions: Subscription[] = [];

  public date: FormControl<Date | null> = new FormControl(new Date());

  constructor(
    private ngZone: NgZone,
    private _snackBar: MatSnackBar,
    public readonly productService: ProductsService,
    public readonly errorService: ErrorService,
    public readonly loggerService: LoggerService
  ) {}

  resetProductList() {
    this.productList = [];
    this.currentPageInfo = null;
  }

  getProductsByDate(date: DateInput, next?: boolean) {
    this.loggerService.info('Fetching products by date: ' + date.after.toUTCString());
    this.selectedDate = date;
    this.isLoading = true;
    return this.productService.fetchProductsByDate(date, next ? this.currentPageInfo?.endCursor : undefined).subscribe(
      (data: QueryType) => {
        this.isLoading = false;
        if (data.posts) {
          this.loggerService.info('Fetching products by date: ' + date.after.toUTCString() + ' succeeded');
          this.productList = next ? [...this.productList, ...data.posts.edges] : data.posts.edges;
          this.currentPageInfo = data.posts.pageInfo;
        }
      },
      (err) => {
        this.isLoading = false;
        this.loggerService.error('Fetching products by date: ' + date.after.toUTCString() + ' failed');
        const errorPayload = err.error as Array<{ message: string }>;
        const error =
          errorPayload.length > 0 && errorPayload[0].message
            ? new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '))
            : new Error('An error occured... Please refresh the page');

        this._snackBar.open(error.message, 'CLOSE');
      }
    );
  }

  // Automatically fetch today's featured products
  ngOnInit(): void {
    const after = new Date();
    const before = new Date();

    after.setHours(0, 0, 0);
    before.setHours(23, 59, 59);

    this.getProductsByDate(new DateInput(after, before));
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
            if (this.selectedDate && this.currentPageInfo?.hasNextPage) {
              this.subscriptions = [...this.subscriptions, this.getProductsByDate(this.selectedDate, true)];
            }
          });
        });
    } catch (e: any) {
      this.errorService.handleError(e);
      this._snackBar.open('An error occured, please try again later', 'CLOSE');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription, i) => {
      if (!subscription.closed) {
        this.loggerService.warn(`Unsubscribing : subscription #${i}`);
        subscription.unsubscribe();
      }
    });
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

    this.subscriptions = [...this.subscriptions, this.getProductsByDate(new DateInput(event.value, before))];
  }
}
