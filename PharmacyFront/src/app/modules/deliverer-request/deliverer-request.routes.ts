import { Routes } from "@angular/router";
import { DelivererRequestsComponent } from "./pages/deliverer-requests/deliverer-requests.component";

export const delivererRoutes : Routes=[
    {
        path:"",
        pathMatch:"full",
        component:DelivererRequestsComponent
    }
]