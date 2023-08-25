import { Routes } from "@angular/router";
import { RootLayoutComponent } from "./pages/root-layout/root-layout.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";

export const routes: Routes = [
    // {
    //   path:"",
    //   component:WelcomeComponent,
    // //   canActivate:[LoginGuard]
    // },
      {
          path: "",
          component: RootLayoutComponent,
          children:[
            {
              path:"",
              loadChildren: () =>
                import("./../products/products.module").then((m) => m.ProductsModule)
            },
            {
              path:"auth",
              loadChildren: () =>
                import("./../auth/auth.module").then((m) => m.AuthModule)
            },
            {
              path:"cart",
              loadChildren: () =>
                import("./../cart/cart.module").then((m) => m.CartModule)
            },
            {
              path:"orders",
              loadChildren: () =>
                import("./../orders/orders.module").then((m) => m.OrdersModule)
            }
            
          ]
        }
  ]