import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';

import { CollectionService } from 'src/app/services/collection/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css'],
})
export class CollectionsComponent implements OnInit {
  public collectionList: Array<IEdge<CollectionType>>;
  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartType: ChartType = 'pie';

  constructor(private _snackBar: MatSnackBar, public readonly collectionService: CollectionService) {}

  ngOnInit(): void {
    this.collectionService.getCollection((err) => this._snackBar.open(err.message, 'CLOSE'));
  }

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          } else {
            return null;
          }
        },
      },
    },
  };

  getChartData(): ChartData<'pie', number[], string | string[]> {
    const labels = this.collectionService.collectionList.map((col) => col.node.name);
    const data = this.collectionService.collectionList.map((col) => col.node.posts.totalCount);

    return { labels, datasets: [{ data }] };
  }
}
