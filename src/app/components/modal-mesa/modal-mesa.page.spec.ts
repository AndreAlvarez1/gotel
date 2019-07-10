import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMesaPage } from './modal-mesa.page';

describe('ModalMesaPage', () => {
  let component: ModalMesaPage;
  let fixture: ComponentFixture<ModalMesaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMesaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMesaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
