import { Routes } from "@angular/router";
import { OrdersViewComponent } from "./pages/orders-view/orders-view.component";
import { FullViewOrderComponent } from "./pages/full-view-order/full-view-order.component";

export const ordersRoutes: Routes = [
    {
      path:"",
      pathMatch:"full",
      component:OrdersViewComponent
    },
    {
      path:"full-view-order",
      pathMatch:"full",
      component:FullViewOrderComponent
    }
  ];