import { Component, OnInit, Input } from '@angular/core';
import { ChartData, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [],
})
export class DoughnutComponent implements OnInit {
  @Input() title = '';
  @Input('labels') doughnutChartLabels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  @Input() data = [{ data: [100, 100, 100] }];

  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [],
  };

  public doughnutChartType: ChartType = 'doughnut';

  constructor() {}

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: this.data,
    };
  }
}
