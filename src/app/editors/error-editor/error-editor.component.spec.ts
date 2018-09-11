import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorEditorComponent } from './error-editor.component';

describe('ErrorEditorComponent', () => {
  let component: ErrorEditorComponent;
  let fixture: ComponentFixture<ErrorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
