import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrimestreComponent } from './trimestre.component';

describe('TrimestreComponent', () => {
  let component: TrimestreComponent;
  let fixture: ComponentFixture<TrimestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrimestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
