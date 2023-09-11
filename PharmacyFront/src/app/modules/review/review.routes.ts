import { Routes } from "@angular/router";
import { EditReviewPageComponent } from "./pages/edit-review-page/edit-review-page.component";
import { DelivererReviewsComponent } from "./pages/deliverer-reviews/deliverer-reviews.component";
import { ReportedReviewsComponent } from "./pages/reported-reviews/reported-reviews.component";
import { RoleGuard } from "../auth/guards/role/role.guard";

export const reviewRoutes: Routes = [
    {
      path:"edit-review",
      pathMatch:"full",
      component:EditReviewPageComponent
    },
    {
      path:"deliverer",
      pathMatch:"full",
      component: DelivererReviewsComponent
    },
    {
      path:"reported",
      pathMatch:"full",
      component: ReportedReviewsComponent,
      canActivate:[RoleGuard],
      data:{expectedRoles:"ADMIN"}
    }
  ];