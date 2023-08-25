import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersViewComponent } from './pages/orders-view/orders-view.component';
import { RouterModule } from '@angular/router';
import { ordersRoutes } from './orders.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullViewOrderComponent } from './pages/full-view-order/full-view-order.component';




@NgModule({
  declarations: [
    OrdersViewComponent,
    FullViewOrderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ordersRoutes)
  ]
})
export class OrdersModule { }
