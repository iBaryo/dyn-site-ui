import {Component, OnInit} from '@angular/core';
import {INodeEditor} from '../interfaces';
import {CodeNode} from 'express-dynamic-components';

@Component({
    selector: 'app-error-editor',
    templateUrl: './error-editor.component.html',
    styleUrls: ['./error-editor.component.scss']
})
export class ErrorEditorComponent implements OnInit, INodeEditor {
    public node: CodeNode;

    constructor() {
    }

    ngOnInit() {
    }

}
