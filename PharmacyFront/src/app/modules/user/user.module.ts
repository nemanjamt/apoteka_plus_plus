import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUserComponent } from './pages/block-user/block-user.component';
import { PharmacistsListComponent } from './pages/pharmacists-list/pharmacists-list.component';
import { DeliverersListComponent } from './pages/deliverers-list/deliverers-list.component';
import { UsersListComponent } from './components/users-list/users-list.component';



@NgModule({
  declarations: [
    UserProfileComponent,
    BlockUserComponent,
    PharmacistsListComponent,
    DeliverersListComponent,
    UsersListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class UserModule { }
