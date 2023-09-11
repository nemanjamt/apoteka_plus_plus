import { Routes } from "@angular/router";
import { OrdersViewComponent } from "./pages/orders-view/orders-view.component";
import { FullViewOrderComponent } from "./pages/full-view-order/full-view-order.component";
import { DelivererOrdersFinishedComponent } from "./pages/deliverer-orders-finished/deliverer-orders-finished.component";
import { DelivererOrdersComponent } from "./pages/deliverer-orders/deliverer-orders.component";
import { DelivererOrdersNewComponent } from "./pages/deliverer-orders-new/deliverer-orders-new.component";
import { AdminOrdersDelivererSearchComponent } from "./pages/admin-orders-deliverer-search/admin-orders-deliverer-search.component";
import { AdminOrdersCustomerSearchComponent } from "./pages/admin-orders-customer-search/admin-orders-customer-search.component";

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
    },
    {
      path:"deliverer/finished",
      pathMatch:"full",
      component: DelivererOrdersFinishedComponent
    },
    {
      path:"deliverer/assigned",
      pathMatch:"full",
      component: DelivererOrdersComponent
    },
    {
      path:"deliverer/new",
     pathMatch:"full",
     component:DelivererOrdersNewComponent
    },
    {
      path:"search-deliverers",
      pathMatch:"full",
      component: AdminOrdersDelivererSearchComponent
    },
    {
      path:"search-customers",
      pathMatch:"full",
      component: AdminOrdersCustomerSearchComponent
    }
  ];