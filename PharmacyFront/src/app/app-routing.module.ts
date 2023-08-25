import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './modules/root/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/root/root.module').then(m => m.RootModule) },
  {
    path:"**",
    component:NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
