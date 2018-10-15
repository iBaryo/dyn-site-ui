import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {ConfigNode} from 'express-dynamic-components';
import {ICodeEditorOptions} from '../editors/code-editor/code-editor.component';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

    protected configString: string;
    public options = {
        language: 'json',
        theme: 'vs-dark'
    } as ICodeEditorOptions;

    public get configNode(): ConfigNode {
        try {
            return JSON.parse(this.configString);
        } catch (e) {
            return undefined;
        }
    }

    constructor(@Inject(MAT_DIALOG_DATA) public node: ConfigNode) {
        this.configString = JSON.stringify(node, undefined, 4);
    }

    ngOnInit() {
    }

}
