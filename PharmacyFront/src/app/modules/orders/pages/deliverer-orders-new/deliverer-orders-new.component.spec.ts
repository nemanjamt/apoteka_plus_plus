import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererOrdersNewComponent } from './deliverer-orders-new.component';

describe('DelivererOrdersNewComponent', () => {
  let component: DelivererOrdersNewComponent;
  let fixture: ComponentFixture<DelivererOrdersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererOrdersNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererOrdersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
