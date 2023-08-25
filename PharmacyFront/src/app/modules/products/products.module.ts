import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { RouterModule } from '@angular/router';
import { productsRoutes } from './products.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullViewProductComponent } from './pages/full-view-product/full-view-product.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { CreateReviewComponent } from '../review/components/create-review/create-review.component';
import { ReviewModule } from '../review/review.module';
import { SearchProductViewComponent } from './components/search-product-view/search-product-view.component';




@NgModule({
  declarations: [
    SearchProductsComponent,
    FullViewProductComponent,
    ProductViewComponent,
    SearchProductViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ReviewModule,
    FormsModule,
    RouterModule.forChild(productsRoutes)
  ]
})
export class ProductsModule { }
