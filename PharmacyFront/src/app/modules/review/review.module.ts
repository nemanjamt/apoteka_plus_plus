import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateReviewComponent } from './components/create-review/create-review.component';
import { ListReviewComponent } from './components/list-review/list-review.component';



@NgModule({
  declarations: [
    CreateReviewComponent,
    ListReviewComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CreateReviewComponent,
    ListReviewComponent
  ]
})
export class ReviewModule { }
