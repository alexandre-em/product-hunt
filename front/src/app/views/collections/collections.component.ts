import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartData } from 'chart.js';

import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  public collectionList: Array<IEdge<CollectionType>>;

  constructor(private _snackBar: MatSnackBar, public readonly collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService.getCollection((err) => this._snackBar.open(err.message, 'CLOSE'));
  }

  getChartData(): ChartData<'pie', number[], string | string[]> {
    const labels = this.collectionService.collectionList.map((col) => col.node.name);
    const data = this.collectionService.collectionList.map((col) => col.node.posts.totalCount);

    return { labels, datasets: [{ data }] };
  }
}
