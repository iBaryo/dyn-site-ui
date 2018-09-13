import {Component, OnInit} from '@angular/core';
import {INodeEditor} from '../interfaces';
import {CodeNode} from 'express-dynamic-components';

interface ICodeEditorOptions {
    defaultTemplate: string;
}

@Component({
    selector: 'app-code-editor',
    templateUrl: './code-editor.component.html',
    styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, INodeEditor<ICodeEditorOptions> {
    public node: CodeNode;
    public options: ICodeEditorOptions;

    constructor() {
    }

    ngOnInit() {
    }
}
