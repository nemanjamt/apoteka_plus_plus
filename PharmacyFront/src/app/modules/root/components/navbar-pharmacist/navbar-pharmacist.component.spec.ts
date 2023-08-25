import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPharmacistComponent } from './navbar-pharmacist.component';

describe('NavbarPharmacistComponent', () => {
  let component: NavbarPharmacistComponent;
  let fixture: ComponentFixture<NavbarPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarPharmacistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
