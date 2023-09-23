import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadsComponent } from './roads.component';

describe('RoadsComponent', () => {
  let component: RoadsComponent;
  let fixture: ComponentFixture<RoadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoadsComponent]
    });
    fixture = TestBed.createComponent(RoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
