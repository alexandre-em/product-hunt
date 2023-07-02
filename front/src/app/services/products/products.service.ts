import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DateInput } from 'src/app/models/date.model';
import { Post } from 'src/app/models/post.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  public productList: Array<{ cursor: string; node: Post }> = [];
  public currentPageInfo: any = null;

  constructor(private http: HttpClient) {}

  private fetchProductsByDate(date: DateInput) {
    // TODO: Replace url by env var (Setup env var on project)
    return this.http.get(`http://localhost:5000/api/products/date?after=${date.after}&before=${date.before}`);
  }

  resetProductList() {
    this.productList = [];
    this.currentPageInfo = null;
  }

  getProductsByDate(date: DateInput) {
    this.fetchProductsByDate(date).subscribe((data: any) => {
      console.log(data);
      this.productList = data.posts.edges;
      this.currentPageInfo = data.posts.pageInfo;
    });
  }

  getNextProducts() {}
}
