import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullViewProductComponent } from './full-view-product.component';

describe('FullViewProductComponent', () => {
  let component: FullViewProductComponent;
  let fixture: ComponentFixture<FullViewProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullViewProductComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullViewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
