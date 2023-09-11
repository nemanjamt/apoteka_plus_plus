import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewPageComponent } from './edit-review-page.component';

describe('EditReviewPageComponent', () => {
  let component: EditReviewPageComponent;
  let fixture: ComponentFixture<EditReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditReviewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
