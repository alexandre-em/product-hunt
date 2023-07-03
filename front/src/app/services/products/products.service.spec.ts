import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    console.log(httpClient);
    expect(service).toBeTruthy();
  });
});
