import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartFullViewComponent } from './cart-full-view.component';

describe('CartFullViewComponent', () => {
  let component: CartFullViewComponent;
  let fixture: ComponentFixture<CartFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartFullViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
