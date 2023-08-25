import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewOrderComponent } from './full-view-order.component';

describe('FullViewOrderComponent', () => {
  let component: FullViewOrderComponent;
  let fixture: ComponentFixture<FullViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullViewOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
