import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-charts1',
  templateUrl: './charts1.component.html',
  styles: [],
})
export class Charts1Component implements OnInit {
  backgroundColor = ['#6857E6', '#009FEE', '#F02059'];

  labels1 = ['prueba1', 'prueba2', 'prueba3'];
  data1 = [{ data: [100, 100, 100], backgroundColor: this.backgroundColor }];

  labels2 = ['test 1', 'test 2 ', 'test 3'];
  data2 = [{ data: [150, 80, 300], backgroundColor: this.backgroundColor }];

  constructor() {}

  ngOnInit(): void {}
}
