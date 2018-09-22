import { Component, OnInit } from '@angular/core';
import {INodeEditor} from '../interfaces';
import {CodeNode, HtmlNode} from 'express-dynamic-components';

@Component({
  selector: 'app-html-page-editor',
  templateUrl: './html-page-editor.component.html',
  styleUrls: ['./html-page-editor.component.scss']
})
export class HtmlPageEditorComponent implements OnInit, INodeEditor<any> {
    public node: HtmlNode;
    public options: any;

  constructor() { }

  ngOnInit() {
  }

}
