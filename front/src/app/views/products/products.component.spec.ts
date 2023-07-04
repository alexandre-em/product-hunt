import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/services/products/products.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ScrollingModule,
        MatListModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
      ],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a product list', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const product = compiled.querySelector('.product-list')?.children;
    if (service.productList.length > 0) {
      if (product) {
        expect(product.length).toBe(service.productList.length);
      }
    } else {
      expect(product).toBeUndefined();
    }
  });
});
