import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { getStyle } from '@coreui/utils';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ProduitsComponent } from '../../produits/produits.component';
import { TotalProduitsService } from 'src/app/service/total-produits.service';
import { freeSet } from '@coreui/icons';

@Component({
  selector: 'app-widgets-dropdown',
  templateUrl: './widgets-dropdown.component.html',
  styleUrls: ['./widgets-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class WidgetsDropdownComponent implements OnInit, AfterContentInit {
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private totalProduitsService: TotalProduitsService
  ) {}
  totalProduits = this.totalProduitsService.totalProduits;
  icons = freeSet;
  data: any[] = [];
  options: any[] = [];

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}

@Component({
  selector: 'app-chart-sample',
  template:
    '<c-chart type="line" [data]="data" [options]="options" width="300" #chart></c-chart>',
})
export class ChartSample implements AfterViewInit {
  constructor() {}

  @ViewChild('chart') chartComponent!: ChartjsComponent;

  colors = {
    label: 'My dataset',
    backgroundColor: 'rgba(77,189,116,.2)',
    borderColor: '#4dbd74',
    pointHoverBackgroundColor: '#fff',
  };

  labels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  data = {
    labels: this.labels,
    datasets: [
      {
        data: [65, 59, 84, 84, 51, 55, 40],
        ...this.colors,
        fill: { value: 65 },
      },
    ],
  };

  options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  ngAfterViewInit(): void {}
}
