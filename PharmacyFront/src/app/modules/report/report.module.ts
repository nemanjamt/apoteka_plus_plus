import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { reportRoutes } from './report.routes';
import { BusinessReportComponent } from './pages/business-report/business-report.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    BusinessReportComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    RouterModule.forChild(reportRoutes)
  ],
  providers:[DatePipe]
})
export class ReportModule { }
