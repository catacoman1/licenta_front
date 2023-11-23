import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReteteComponent } from './retete.component';

describe('ReteteComponent', () => {
  let component: ReteteComponent;
  let fixture: ComponentFixture<ReteteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReteteComponent]
    });
    fixture = TestBed.createComponent(ReteteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
