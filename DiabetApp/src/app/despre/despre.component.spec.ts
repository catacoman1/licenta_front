import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespreComponent } from './despre.component';

describe('DespreComponent', () => {
  let component: DespreComponent;
  let fixture: ComponentFixture<DespreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DespreComponent]
    });
    fixture = TestBed.createComponent(DespreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
