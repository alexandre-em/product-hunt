import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgChartsModule } from 'ng2-charts';

import { CollectionsComponent } from './collections.component';
import { CollectionService } from 'src/app/services/collection/collection.service';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule, MatSnackBarModule, NgChartsModule],
      providers: [CollectionService],
    });
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a product list', () => {
    const fixture = TestBed.createComponent(CollectionsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const collectionChart = compiled.querySelector('.chart');
    expect(collectionChart).toBeDefined();
  });
});
