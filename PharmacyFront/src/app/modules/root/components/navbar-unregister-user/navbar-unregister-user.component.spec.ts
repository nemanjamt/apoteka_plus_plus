import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUnregisterUserComponent } from './navbar-unregister-user.component';

describe('NavbarUnregisterUserComponent', () => {
  let component: NavbarUnregisterUserComponent;
  let fixture: ComponentFixture<NavbarUnregisterUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUnregisterUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUnregisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
