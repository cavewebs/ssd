import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusviewPage } from './statusview.page';

describe('StatusviewPage', () => {
  let component: StatusviewPage;
  let fixture: ComponentFixture<StatusviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusviewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
