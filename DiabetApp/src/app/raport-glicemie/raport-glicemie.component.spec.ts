import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaportGlicemieComponent } from './raport-glicemie.component';

describe('RaportGlicemieComponent', () => {
  let component: RaportGlicemieComponent;
  let fixture: ComponentFixture<RaportGlicemieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaportGlicemieComponent]
    });
    fixture = TestBed.createComponent(RaportGlicemieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
