/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Carrousel1Component } from './carrousel-1.component';

describe('Carrousel1Component', () => {
  let component: Carrousel1Component;
  let fixture: ComponentFixture<Carrousel1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Carrousel1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Carrousel1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
