import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersViewComponent } from './pages/orders-view/orders-view.component';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './orders.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullViewOrderComponent } from './pages/full-view-order/full-view-order.component';
import { DelivererOrdersNewComponent } from './pages/deliverer-orders-new/deliverer-orders-new.component';
import { DelivererOrdersFinishedComponent } from './pages/deliverer-orders-finished/deliverer-orders-finished.component';
import { DelivererOrdersComponent } from './pages/deliverer-orders/deliverer-orders.component';
import { ReviewModule } from '../review/review.module';
import { AdminOrdersDelivererSearchComponent } from './pages/admin-orders-deliverer-search/admin-orders-deliverer-search.component';
import { AdminOrdersCustomerSearchComponent } from './pages/admin-orders-customer-search/admin-orders-customer-search.component';
import { ListOrdersComponent } from './components/list-orders/list-orders.component';




@NgModule({
  declarations: [
    OrdersViewComponent,
    FullViewOrderComponent,
    DelivererOrdersNewComponent,
    DelivererOrdersFinishedComponent,
    DelivererOrdersComponent,
    AdminOrdersDelivererSearchComponent,
    AdminOrdersCustomerSearchComponent,
    ListOrdersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReviewModule,
    ReactiveFormsModule,
    RouterModule.forChild(ordersRoutes)
  ]
})
export class OrdersModule { }
