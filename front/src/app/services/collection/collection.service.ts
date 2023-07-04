import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  public collectionList: Array<IEdge<CollectionType>> = [];
  public isLoading = false;

  constructor(
    private http: HttpClient,
    private readonly loggerService: LoggerService,
    private readonly errorService: ErrorService
  ) {}

  private fetchCollections(cursor?: string) {
    const next = !cursor ? '' : `?next=${cursor}`;

    return this.http.get(`${environment.apiUrl}/collections${next}`);
  }

  getCollection(onError?: (err: Error) => void) {
    if (this.collectionList.length > 0) {
      return;
    }

    this.loggerService.info('Fetching collection');
    this.isLoading = true;

    this.fetchCollections().subscribe(
      (data: QueryType) => {
        this.isLoading = false;
        if (data.collections) {
          this.loggerService.info('Fetching collection succeeded');
          this.collectionList = data.collections.edges;
        } else {
          this.loggerService.error('Fetching collection failed');
          const errorPayload = data as Array<{ message: string }>;
          if (errorPayload.length > 0 && errorPayload[0].message) {
            const error = new Error(errorPayload.reduce((prev, curr) => `${prev}${curr.message}, `, 'Reasons: '));
            if (onError) {
              onError(error);
            }

            throw error;
          }
          const error = new Error('An error occured... Please refresh the page');

          if (onError) {
            onError(error);
          }

          throw error;
        }
      },
      (err) => {
        if (onError) {
          onError(err);
        }
        this.errorService.handleError(err);
      }
    );
  }
}
