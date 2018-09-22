import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlPageEditorComponent } from './html-page-editor.component';

describe('HtmlPageEditorComponent', () => {
  let component: HtmlPageEditorComponent;
  let fixture: ComponentFixture<HtmlPageEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlPageEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlPageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
