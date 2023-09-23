import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolylineComponent } from './polyline.component';

describe('PolylineComponent', () => {
  let component: PolylineComponent;
  let fixture: ComponentFixture<PolylineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolylineComponent]
    });
    fixture = TestBed.createComponent(PolylineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
