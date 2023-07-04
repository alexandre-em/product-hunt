import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CollectionsComponent } from './collections.component';
import { CollectionService } from 'src/app/services/collection/collection.service';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';

describe('CollectionsComponent', () => {
  let component: CollectionsComponent;
  let fixture: ComponentFixture<CollectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectionsComponent],
      imports: [HttpClientTestingModule, MatProgressSpinnerModule, MatSnackBarModule, PieChartComponent],
      providers: [CollectionService],
    });
    fixture = TestBed.createComponent(CollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a pie chart', () => {
    const fixture = TestBed.createComponent(CollectionsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const collectionChart = compiled.querySelector('.chart');
    expect(collectionChart).toBeDefined();
  });
});
