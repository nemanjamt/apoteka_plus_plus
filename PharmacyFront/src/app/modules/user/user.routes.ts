import { Routes } from "@angular/router";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { BlockUserComponent } from "./pages/block-user/block-user.component";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { PharmacistsListComponent } from "./pages/pharmacists-list/pharmacists-list.component";
import { DeliverersListComponent } from "./pages/deliverers-list/deliverers-list.component";

export const userRoutes: Routes = [
    {
      path: 'profile',
      pathMatch: 'full',
      component: UserProfileComponent,
    },
    {
      path: 'block',
      pathMatch: "full",
      component: BlockUserComponent,
      canActivate:[RoleGuard],
      data:{expectedRoles:"ADMIN|PHARMACIST"}
    },
    {
      path: 'pharmacists',
      pathMatch: "full",
      component: PharmacistsListComponent,
      canActivate:[RoleGuard],
      data:{expectedRoles:"ADMIN"}
    },
    {
      path: 'deliverers',
      pathMatch: "full",
      component: DeliverersListComponent,
      canActivate:[RoleGuard],
      data:{expectedRoles:"ADMIN"}
    }
  ];