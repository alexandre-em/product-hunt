import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DateInput } from 'src/app/models/date.model';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public selectedDate: DateInput | null = null;
  public productList: Array<Partial<IEdge<PostType>>> = [];
  public currentPageInfo: IPageInfo | null = null;
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private readonly errorService: ErrorService,
    private readonly loggerService: LoggerService
  ) {}

  private fetchProductsByDate(date: DateInput, cursor?: string) {
    const next = !cursor ? '' : `&next=${cursor}`;
    return this.http.get(`${environment.apiUrl}/products/date?after=${date.after}&before=${date.before}${next}`);
  }

  private addProductToList(toAdd: Array<Partial<IEdge<PostType>>>) {
    this.productList = [...this.productList, ...toAdd];
  }

  resetProductList() {
    this.productList = [];
    this.currentPageInfo = null;
  }

  getProductsByDate(date: DateInput, onError?: (err: Error) => void) {
    this.loggerService.info('Fetching products by date: ' + date.after.toUTCString());
    this.selectedDate = date;
    this.isLoading = true;
    this.fetchProductsByDate(date).subscribe(
      (data: QueryType) => {
        this.isLoading = false;
        if (data.posts) {
          this.loggerService.info('Fetching products by date: ' + date.after.toUTCString() + ' succeeded');
          this.productList = data.posts.edges;
          this.currentPageInfo = data.posts.pageInfo;
        } else {
          this.loggerService.error('Fetching products by date: ' + date.after.toUTCString() + ' failed');
          const errorPayload = data as Array<{ message: string }>;
          if (errorPayload.length > 0 && errorPayload[0].message) {
            const error = new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '));
            if (onError) {
              onError(error);
            }

            throw error;
          }
          const error = new Error('An error occured... Please refresh the page');

          if (onError) {
            onError(error);
          }

          throw error;
        }
      },
      (err) => {
        if (onError) {
          onError(err);
        }
        this.errorService.handleError(err);
      }
    );
  }

  getNextProducts(type: string, onError?: (err: Error) => void) {
    if (this.selectedDate && this.currentPageInfo?.hasNextPage) {
      switch (type) {
        case 'date':
          this.loggerService.info('Fetching next products by date: ' + this.selectedDate.after.toUTCString() + ' succeeded');
          this.isLoading = true;
          this.fetchProductsByDate(this.selectedDate, this.currentPageInfo.endCursor).subscribe((data: QueryType) => {
            this.isLoading = false;
            if (data.posts) {
              this.addProductToList(data.posts.edges);
              this.currentPageInfo = data.posts.pageInfo;
            } else {
              this.loggerService.error('Fetching next products by date: ' + this.selectedDate?.after?.toUTCString() + ' failed');
              const errorPayload = data as Array<{ message: string }>;
              if (errorPayload.length > 0 && errorPayload[0].message) {
                const error = new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '));
                if (onError) {
                  onError(error);
                }
                throw error;
              }
              const error = new Error('An error occured... Please refresh the page');

              if (onError) {
                onError(error);
              }
              throw error;
            }
          }, this.errorService.handleError);
          break;
        default:
          this.loggerService.info('Other fetching products function'); // Replace by another fetch function
          break;
      }
    }
  }
}
