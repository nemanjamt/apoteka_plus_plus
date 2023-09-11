import { Routes } from "@angular/router";
import { BusinessReportComponent } from "./pages/business-report/business-report.component";

export const reportRoutes : Routes = [
    {
        path:"business",
        pathMatch:"full",
        component: BusinessReportComponent
    }
]