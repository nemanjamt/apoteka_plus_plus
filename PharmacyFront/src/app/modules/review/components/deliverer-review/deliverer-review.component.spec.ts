import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererReviewComponent } from './deliverer-review.component';

describe('DelivererReviewComponent', () => {
  let component: DelivererReviewComponent;
  let fixture: ComponentFixture<DelivererReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
