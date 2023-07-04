import { TestBed } from '@angular/core/testing';

import { CollectionService } from './collection.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('CollectionService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: CollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CollectionService],
    });
    service = TestBed.inject(CollectionService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return featured products for a specific date', () => {
    const expectedRes = {
      collections: {
        totalCount: 1,
        edges: [
          {
            cursor: 'MQ',
            node: {
              id: '8890',
              name: 'Free Stuff For Startups',
              coverImage: 'https://ph-files.imgix.net/13b32f60-8a0f-44a7-84ad-c867c6c14a64.jpeg?auto=format',
              posts: {
                totalCount: 20,
              },
            },
          },
        ],
        pageInfo: {
          startCursor: 'MQ',
          endCursor: 'MQ',
          hasPreviousPage: false,
          hasNextPage: true,
        },
      },
    };

    service.getCollection();

    const req = httpTestingController.expectOne(`${environment.apiUrl}/collections`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedRes); //Return expectedEmps
  });
});
