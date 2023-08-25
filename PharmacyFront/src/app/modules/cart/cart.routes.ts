import { Routes } from "@angular/router";
import { CartFullViewComponent } from "./pages/cart-full-view/cart-full-view.component";

export const cartRoutes: Routes = [
    {
      path:"",
      pathMatch:"full",
      component:CartFullViewComponent
    }
  ];

