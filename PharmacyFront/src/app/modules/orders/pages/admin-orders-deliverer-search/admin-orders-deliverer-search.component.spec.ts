import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersDelivererSearchComponent } from './admin-orders-deliverer-search.component';

describe('AdminOrdersDelivererSearchComponent', () => {
  let component: AdminOrdersDelivererSearchComponent;
  let fixture: ComponentFixture<AdminOrdersDelivererSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersDelivererSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersDelivererSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
