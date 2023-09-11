import { Routes } from '@angular/router';
import { SearchProductsComponent } from './pages/search-products/search-products.component';
import { FullViewProductComponent } from './pages/full-view-product/full-view-product.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { ChangeProductComponent } from './pages/change-product/change-product.component';

export const productsRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SearchProductsComponent,
  },
  {
    path: 'full-view-product',
    pathMatch: 'full',
    component: FullViewProductComponent,
  },
  {
    path: 'create-product',
    pathMatch: 'full',
    component:CreateProductComponent
  },
  {
    path: 'edit-product',
    pathMatch: 'full',
    component: ChangeProductComponent
  }
];
