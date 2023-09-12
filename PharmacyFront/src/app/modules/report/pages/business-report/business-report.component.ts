import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis } from 'ng-apexcharts';
import { ReportItem } from '../../types/report';
import { ReportServiceService } from '../../services/report-service.service';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
};

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit {
  maxDate: string = new Date().toISOString().substring(0, 10);
  minDate : string = new Date("1990-01-01").toISOString().substring(0, 10);
  totalValue: number = 0;
  averageValue: number = 0;
  roundedAverageValue !:string;
  choosedStartDate!:string;
   choosedEndDate !:string;
  public chartOptions: Partial<ChartOptions> | any;
  reportItems: ReportItem[] = [];
  constructor(private datePipe: DatePipe, private reportService: ReportServiceService) {
    console.log( this.formatDate(new Date("2023-09-11")));
    this.initCharts();
   }

  ngOnInit(): void {
  }

  initCharts(){
    this.chartOptions = {
      series: [
        {
          name: "prihodi",
          data: this.reportItems.map(r => r.value),
          stroke: "#ff0000"
        }
      ],
      chart: {
        type: "line",
      },
      title: {
        text: "Izvjestaj prihoda"
      },
      xaxis: {
        labels: {
          show: false
        },
        categories: this.reportItems.map(r => this.formatDate(new Date(r.date)))
      }
    };
  }

  onDateChange(value: string){
    this.choosedStartDate = value;
    this.reportService.getReport(this.choosedStartDate, this.choosedEndDate).subscribe({
      next: (res) => {this.reportItems = res.data; console.log(this.reportItems);this.initCharts();
        this.calculateValues();},
      error: (err) => {}
    })
    console.log(this.choosedStartDate);
    if(this.choosedEndDate){
      // this.getDates();
    }
  }

  onEndDateChange(value:string){
    this.choosedEndDate = value;
    this.reportService.getReport(this.choosedStartDate, this.choosedEndDate).subscribe({
      next: (res) => {this.reportItems = res.data; console.log(this.reportItems);this.initCharts();this.calculateValues();},
      error: (err) => {}
    });
    console.log(this.choosedEndDate);
    if(this.choosedStartDate){
      // this.getDates();
    }

  }

  formatDate(date: Date): string {
   
    return `${this.datePipe.transform(date, 'dd.MM.yyyy')}`;
  }

  calculateValues(){
    this.totalValue = 0;
    this.averageValue = 0;
    for(let item of this.reportItems){
      this.totalValue += item.value;
    }
    this.averageValue = this.totalValue/this.reportItems.length;
    this.roundedAverageValue = this.averageValue.toFixed(2);
  }

}
