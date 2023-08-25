import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartFullViewComponent } from './pages/cart-full-view/cart-full-view.component';
import { RouterModule } from '@angular/router';
import {cartRoutes} from './cart.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CartFullViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(cartRoutes)
  ]
})
export class CartModule { }
