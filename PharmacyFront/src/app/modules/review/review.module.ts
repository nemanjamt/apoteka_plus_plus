import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { ListReviewComponent } from './components/list-review/list-review.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { reviewRoutes } from './review.routes';
import { EditReviewPageComponent } from './pages/edit-review-page/edit-review-page.component';
import { DelivererReviewsComponent } from './pages/deliverer-reviews/deliverer-reviews.component';
import { ReportedReviewsComponent } from './pages/reported-reviews/reported-reviews.component';
import { DelivererReviewComponent } from './components/deliverer-review/deliverer-review.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { AuthModule } from '../auth/auth.module';



@NgModule({
  declarations: [
    CreateReviewComponent,
    ListReviewComponent,
    EditReviewPageComponent,
    DelivererReviewsComponent,
    ReportedReviewsComponent,
    DelivererReviewComponent,
    ProductReviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    RouterModule.forChild(reviewRoutes)
  ],
  exports:[
    CreateReviewComponent,
    ListReviewComponent,
    DelivererReviewComponent
  ]
})
export class ReviewModule { }
