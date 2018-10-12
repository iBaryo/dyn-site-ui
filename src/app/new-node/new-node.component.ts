import {Component, ViewEncapsulation, ViewChild, Inject, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent, MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatSelectChange} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {INodeTypeInfo, INodeTypes, NodeTypesService} from '../node-types.service';
import {CodeNode} from 'express-dynamic-components';
import {NodeEditorComponent} from '../node-editor/node-editor.component';

const COMMA = 188;

@Component({
    selector: 'app-new-node',
    encapsulation: ViewEncapsulation.None,
    template: `
        <div class="new-message-toolbar" mat-dialog-title>
            <mat-icon>extension</mat-icon>
            <button mat-icon-button mat-dialog-close>
                <mat-icon>clear</mat-icon>
            </button>
        </div>
        <mat-dialog-content class="new-message-content">
            <mat-form-field class="recipients-list">
                <mat-select (valueChange)="onChange($event)" placeholder="Component Type">
                    <mat-option *ngFor="let type of componentTypeNames" [value]="type">
                        {{type}}
                    </mat-option>
                </mat-select>
            </mat-form-field>
            <app-node-editor #nodeEditor [hidden]="!node.type" [node]="node"></app-node-editor>
        </mat-dialog-content>
        <mat-dialog-actions>
            <button mat-raised-button color="primary" [mat-dialog-close]="true" [disabled]="!node.type">
                Create
            </button>
        </mat-dialog-actions>
    `,
    styleUrls: ['./new-node.component.scss']
})
export class NewNodeComponent implements OnInit {
    public componentTypeNames: string[];
    public node: CodeNode;
    @ViewChild('nodeEditor') public nodeEditor: NodeEditorComponent;

    constructor(@Inject(MAT_DIALOG_DATA) public data: {alignment: keyof INodeTypes},
                typesService: NodeTypesService) {
        this.componentTypeNames = typesService.getTypeNames(data.alignment);
    }

    public ngOnInit() {
        this.node = {} as CodeNode;
    }

    public onChange(selected: string) {
        this.nodeEditor.node = this.node = {
            type: (selected || '').toString(),
            desc: this.node.desc
        } as CodeNode;

        this.nodeEditor.ngOnInit();
    }
}