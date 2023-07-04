import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
  standalone: true,
  imports: [NgChartsModule],
  providers: [{ provide: NgChartsConfiguration, useValue: { generateColors: false } }],
})
export class PieChartComponent {
  @Input() data: ChartData<'pie', number[], string | string[]>;

  public pieChartPlugins = [DatalabelsPlugin];
  public pieChartType: ChartType = 'pie';

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
}
