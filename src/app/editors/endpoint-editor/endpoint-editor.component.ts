import {Component, Input, OnInit} from '@angular/core';
import {INodeEditor} from '../interfaces';
import {ICodeEditorOptions} from '../code-editor/code-editor.component';
import {EndpointNode} from 'express-dynamic-components';

@Component({
  selector: 'app-endpoint-editor',
  templateUrl: './endpoint-editor.component.html',
  styleUrls: ['./endpoint-editor.component.scss']
})
export class EndpointEditorComponent implements OnInit, INodeEditor<ICodeEditorOptions> {
    @Input()
    public node: EndpointNode;
    @Input()
    public options: ICodeEditorOptions;

  constructor() { }

  ngOnInit() {
  }
}
