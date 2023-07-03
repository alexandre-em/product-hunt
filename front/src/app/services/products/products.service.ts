import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DateInput } from 'src/app/models/date.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public selectedDate: DateInput | null = null;
  public productList: Array<Partial<IEdge<PostType>>> = [];
  public currentPageInfo: IPageInfo | null = null;
  public isLoading = false;

  constructor(private http: HttpClient) {}

  private fetchProductsByDate(date: DateInput, cursor?: string) {
    const next = !cursor ? '' : `&next=${cursor}`;
    // TODO: Replace url by env var (Setup env var on project)
    return this.http.get(`http://localhost:5000/api/products/date?after=${date.after}&before=${date.before}${next}`);
  }

  private addProductToList(toAdd: Array<Partial<IEdge<PostType>>>) {
    this.productList = [...this.productList, ...toAdd];
  }

  resetProductList() {
    this.productList = [];
    this.currentPageInfo = null;
  }

  // TODO: Manage error on product view component, Add a error handler service and a snackbar on app.component level
  getProductsByDate(date: DateInput) {
    this.selectedDate = date;
    this.isLoading = true;
    this.fetchProductsByDate(date).subscribe((data: QueryType) => {
      this.isLoading = false;
      if (data.posts) {
        this.productList = data.posts.edges;
        this.currentPageInfo = data.posts.pageInfo;
      } else {
        const errorPayload = data as Array<{ message: string }>;
        if (errorPayload.length > 0 && errorPayload[0].message) {
          throw new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '));
        }
        throw new Error('An error occured... Please refresh the page');
      }
    });
  }

  // TODO: Manage error on product view component
  getNextProducts(type: string) {
    if (this.selectedDate && this.currentPageInfo?.hasNextPage) {
      switch (type) {
        case 'date':
          this.isLoading = true;
          this.fetchProductsByDate(this.selectedDate, this.currentPageInfo.endCursor).subscribe((data: QueryType) => {
            this.isLoading = false;
            if (data.posts) {
              this.addProductToList(data.posts.edges);
              this.currentPageInfo = data.posts.pageInfo;
            } else {
              const errorPayload = data as Array<{ message: string }>;
              if (errorPayload.length > 0 && errorPayload[0].message) {
                throw new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '));
              }
              throw new Error('An error occured... Please refresh the page');
            }
          });
          break;
        default:
          console.log('Fetching products'); // Replace by another fetch function
          break;
      }
    }
  }
}
