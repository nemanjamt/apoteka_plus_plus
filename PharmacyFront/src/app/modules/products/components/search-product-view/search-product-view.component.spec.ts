import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductViewComponent } from './search-product-view.component';

describe('SearchProductViewComponent', () => {
  let component: SearchProductViewComponent;
  let fixture: ComponentFixture<SearchProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
