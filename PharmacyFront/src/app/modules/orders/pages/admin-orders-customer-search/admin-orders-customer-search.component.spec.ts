import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersCustomerSearchComponent } from './admin-orders-customer-search.component';

describe('AdminOrdersCustomerSearchComponent', () => {
  let component: AdminOrdersCustomerSearchComponent;
  let fixture: ComponentFixture<AdminOrdersCustomerSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOrdersCustomerSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminOrdersCustomerSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
