import { Routes } from "@angular/router";
import { SearchProductsComponent } from "./pages/search-products/search-products.component";
import { FullViewProductComponent } from "./pages/full-view-product/full-view-product.component";

export const productsRoutes : Routes = [
    {
        path:"",
        pathMatch:"full",
        component: SearchProductsComponent
    
    },
{
    path:"full-view-product",
    pathMatch:"full",
    component: FullViewProductComponent
}];