import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererOrdersFinishedComponent } from './deliverer-orders-finished.component';

describe('DelivererOrdersFinishedComponent', () => {
  let component: DelivererOrdersFinishedComponent;
  let fixture: ComponentFixture<DelivererOrdersFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererOrdersFinishedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererOrdersFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
