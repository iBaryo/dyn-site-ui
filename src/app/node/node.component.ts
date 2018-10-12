import {
    Component, HostBinding, ViewEncapsulation, Input, Output, EventEmitter, OnInit, ViewChild,
    ComponentFactoryResolver
} from '@angular/core';
import {CodeNode} from 'express-dynamic-components';
import {NodeTypesService, INodeTypeInfo} from '../node-types.service';

@Component({
    selector: 'app-node',
    encapsulation: ViewEncapsulation.None,
    template: `
        <mat-card>
            <mat-expansion-panel (opened)="opened = true" (closed)="opened = false" hideToggle="true">
                <mat-expansion-panel-header>
                    <div
                            class="message-toolbar"
                            fxLayoutAlign="start center"
                            fxLayout="row">
                        <div fxFlex="50px" [fxShow]="!opened">
                          <span class="avatar accent-1">
                            {{node.type[0].toUpperCase()}}
                          </span>
                        </div>
                        <div fxFlex="70%" [fxShow]="!opened">
                            {{node.desc || 'no description'}}
                        </div>
                        <div fxFlex fxFill class="message-subject">
                            {{node.type}}
                        </div>
                        <div fxFlex="15%" class="btn-col">
                            <button mat-icon-button (click)="removed.emit()" matTooltip="Delete"
                                    matTooltipPosition="above">
                                <mat-icon>delete</mat-icon>
                            </button>
                        </div>
                    </div>
                </mat-expansion-panel-header>
                <div class="message-body" fxLayout="row">
                    <div fxFlex="50px">
                      <span class="avatar accent-1 large">
                        {{node.type[0].toUpperCase()}}
                      </span>
                    </div>
                    <app-node-editor fxFlex [node]="node"></app-node-editor>
                </div>
            </mat-expansion-panel>
        </mat-card>
    `,
    styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
    @HostBinding('class.message-opened')
    @Input()
    public opened = false;

    @Input()
    public node: CodeNode;

    public nodeInfo: INodeTypeInfo;

    @Output() removed = new EventEmitter<void>();

    constructor(private _editorsService: NodeTypesService) {

    }

    ngOnInit(): void {
        this.nodeInfo = this._editorsService.get(this.node.type);
    }

    onOpenToggle(): void {
        this.opened = !this.opened;
    }
}
