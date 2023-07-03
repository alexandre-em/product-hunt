import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DateInput } from 'src/app/models/date.model';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public selectedDate: DateInput | null = null;
  public productList: Array<{ cursor: string; node: Post }> = [];
  public currentPageInfo: any = null;
  public isLoading: boolean = false;

  constructor(private http: HttpClient) {}

  private fetchProductsByDate(date: DateInput, cursor?: string) {
    const next = !cursor ? '' : `&next=${cursor}`;
    // TODO: Replace url by env var (Setup env var on project)
    return this.http.get(`http://localhost:5000/api/products/date?after=${date.after}&before=${date.before}${next}`);
  }

  private addProductToList(toAdd: Array<{ cursor: string; node: Post }>) {
    this.productList = [...this.productList, ...toAdd];
  }

  resetProductList() {
    this.productList = [];
    this.currentPageInfo = null;
  }

  getProductsByDate(date: DateInput) {
    this.selectedDate = date;
    this.isLoading = true;
    this.fetchProductsByDate(date).subscribe((data: any) => {
      this.productList = data.posts.edges;
      this.currentPageInfo = data.posts.pageInfo;
      this.isLoading = false;
    });
  }

  getNextProducts(type: string) {
    if (this.selectedDate && this.currentPageInfo.hasNextPage) {
      switch (type) {
        case 'date':
          this.isLoading = true;
          this.fetchProductsByDate(this.selectedDate, this.currentPageInfo.endCursor).subscribe((data: any) => {
            this.addProductToList(data.posts.edges);
            this.currentPageInfo = data.posts.pageInfo;
            this.isLoading = false;
          });
          break;
        default:
          console.log('Fetching products'); // Replace by another fetch function
          break;
      }
    }
  }
}
