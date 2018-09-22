import {Component, OnInit} from '@angular/core';
import {INodeEditor} from '../interfaces';
import {CodeNode} from 'express-dynamic-components';

export interface ICodeEditorOptions {
    defaultTemplate: string;
    theme?: string;
    language?: string;
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
        this.options.theme = this.options.theme || 'vs-dark';
        this.options.language = this.options.language || 'javascript';
        this.node.code = this.node.code || this.options.defaultTemplate;
    }
}
