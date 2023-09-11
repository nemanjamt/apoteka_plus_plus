import { Routes } from "@angular/router";
import { RootLayoutComponent } from "./pages/root-layout/root-layout.component";
import { WelcomeComponent } from "./pages/welcome/welcome.component";
import { ForbiddenComponent } from "./pages/forbidden/forbidden.component";

export const routes: Routes = [
    // {
    //   path:"",
    //   component:WelcomeComponent,
    // //   canActivate:[LoginGuard]
    // },
      {
        path:"forbidden",
        pathMatch:"full",
        component:ForbiddenComponent
      },
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
              path:"deliverer-requests",
              loadChildren: () =>
                import("./../deliverer-request/deliverer-request.module").then((m) => m.DelivererRequestModule)
            },
            {
              path:"user",
              loadChildren: () =>
                import("./../user/user.module").then((m) => m.UserModule)
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
            },
            {
              path:"reviews",
              loadChildren: () =>
                import("./../review/review.module").then((m) => m.ReviewModule)
            },
            {
              path:"report",
              loadChildren: () =>
                import("./../report/report.module").then((m) => m.ReportModule)
            }
            
          ]
        }
  ]