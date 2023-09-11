import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DelivererRequestsComponent } from './pages/deliverer-requests/deliverer-requests.component';
import { RouterModule } from '@angular/router';
import { delivererRoutes } from './deliverer-request.routes';



@NgModule({
  declarations: [
    DelivererRequestsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(delivererRoutes)
  ]
})
export class DelivererRequestModule { }
