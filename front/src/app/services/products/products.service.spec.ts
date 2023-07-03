import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { DateInput } from 'src/app/models/date.model';

describe('ProductsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
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
      posts: {
        totalCount: 20,
        edges: [
          {
            cursor: 'MQ',
            node: {
              name: 'SPARQ',
              url: 'https://www.producthunt.com/posts/sparq-2?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+Malou+%28ID%3A+101984%29',
              featuredAt: '2021-07-27T15:15:22Z',
              description:
                'SPARQ - personal finance platform for everyday use, that is on a pace to create the culture of effective money management amongst the European Millennials and Gen Z',
              commentsCount: 1,
              reviewsCount: 2,
              reviewsRating: 5,
              media: [
                {
                  url: 'https://ph-files.imgix.net/1d81aef0-410b-418a-b0df-9c4977789993.png?auto=format',
                },
                {
                  url: 'https://ph-files.imgix.net/176b58f4-0a1c-48d7-b73e-379b5cd6327e.jpeg?auto=format',
                },
                {
                  url: 'https://ph-files.imgix.net/4055fc54-3096-4fe9-b5ea-91bbfe1065c8.jpeg?auto=format',
                },
                {
                  url: 'https://ph-files.imgix.net/1a0c77a7-a242-4ca9-95b8-0efcf06435a7.jpeg?auto=format',
                },
                {
                  url: 'https://ph-files.imgix.net/2ae30816-b505-4d9a-989f-0aeeb804cd9c.jpeg?auto=format',
                },
                {
                  url: 'https://ph-files.imgix.net/fab8b899-3caa-4269-b8bc-f325b73a8032.png?auto=format',
                },
              ],
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

    const after = new Date(2021, 6, 27, 0, 0, 0);
    const before = new Date(2021, 6, 27, 23, 59, 59);

    service.getProductsByDate(new DateInput(after, before));

    const req = httpTestingController.expectOne(`http://localhost:5000/api/products/date?after=${after}&before=${before}`);
    expect(req.request.method).toEqual('GET');

    req.flush(expectedRes); //Return expectedEmps
  });
});
