import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelivererRequestsComponent } from './deliverer-requests.component';

describe('DelivererRequestsComponent', () => {
  let component: DelivererRequestsComponent;
  let fixture: ComponentFixture<DelivererRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DelivererRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DelivererRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
