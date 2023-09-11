import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererReviewsComponent } from './deliverer-reviews.component';

describe('DelivererReviewsComponent', () => {
  let component: DelivererReviewsComponent;
  let fixture: ComponentFixture<DelivererReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
