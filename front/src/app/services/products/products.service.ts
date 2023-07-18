import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DateInput } from 'src/app/models/date.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProductsByDate(date: DateInput, cursor?: string) {
    const next = !cursor ? '' : `&next=${cursor}`;
    return this.http.get(`${environment.apiUrl}/products/date?after=${date.after}&before=${date.before}${next}`);
  }
}
