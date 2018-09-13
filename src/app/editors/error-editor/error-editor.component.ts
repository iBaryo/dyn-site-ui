import {Component, OnInit} from '@angular/core';
import {INodeEditor} from '../interfaces';
import {CodeNode} from 'express-dynamic-components';

export interface IErrorEditorOptions {
    error: Error;
}

@Component({
    selector: 'app-error-editor',
    templateUrl: './error-editor.component.html',
    styleUrls: ['./error-editor.component.scss']
})
export class ErrorEditorComponent implements OnInit, INodeEditor<IErrorEditorOptions> {
    public node: CodeNode;
    public options: IErrorEditorOptions;

    constructor() {
    }

    ngOnInit() {
    }

}
