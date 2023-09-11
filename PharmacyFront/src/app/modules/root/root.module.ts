import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootLayoutComponent } from './pages/root-layout/root-layout.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RouterModule } from '@angular/router';
import { routes } from './root.routes';
import { NavbarUnregisterUserComponent } from './components/navbar-unregister-user/navbar-unregister-user.component';
import { NavbarAdminComponent } from './components/navbar-admin/navbar-admin.component';
import { NavbarPharmacistComponent } from './components/navbar-pharmacist/navbar-pharmacist.component';
import { NavbarDelivererComponent } from './components/navbar-deliverer/navbar-deliverer.component';
import { NavbarCustomerComponent } from './components/navbar-customer/navbar-customer.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';



@NgModule({
  declarations: [
    RootLayoutComponent,
    WelcomeComponent,
    NotFoundPageComponent,
    NavbarUnregisterUserComponent,
    NavbarAdminComponent,
    NavbarPharmacistComponent,
    NavbarDelivererComponent,
    NavbarCustomerComponent,
    ForbiddenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RootModule { }
