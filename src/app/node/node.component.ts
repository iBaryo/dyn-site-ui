import {
    Component, HostBinding, ViewEncapsulation, Input, Output, EventEmitter, OnInit, ViewChild,
    ComponentFactoryResolver
} from '@angular/core';
import {CodeNode} from 'express-dynamic-components';
import {NodeTypesService, INodeTypeInfo, IEditorInfo} from '../node-types.service';
import {EditorHostDirective} from "../editor-host.directive";
import {INodeEditor} from "../editors/interfaces";
import {ErrorEditorComponent, IErrorEditorOptions} from "../editors/error-editor/error-editor.component";

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
                            {{nodeInfo.alignment[0].toUpperCase()}}
                          </span>
                        </div>
                        <div fxFlex="20%" [fxShow]="!opened">
                            {{node.type}}
                        </div>
                        <div fxFlex fxFill class="message-subject">
                            {{node.desc}}
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
                        {{nodeInfo.alignment[0].toUpperCase()}}
                      </span>
                    </div>
                    <div fxFlex>
                        <div class="message-body-toolbar">
                            <span class="message-to">{{node.type}}</span>
                            <button mat-icon-button class="message-more" [matMenuTriggerFor]="menu">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            <mat-menu class="message-more-menu" #menu="matMenu" [overlapTrigger]="false"
                                      xPosition="before">
                                <button mat-menu-item (click)="onReply()">
                                    <mat-icon>reply</mat-icon>
                                    Duplicate
                                </button>
                            </mat-menu>
                        </div>
                        <ng-template appEditorHost></ng-template>
                    </div>
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

    @ViewChild(EditorHostDirective) public editorHost: EditorHostDirective;

    @Output() removed = new EventEmitter<void>();

    constructor(private _editorsService: NodeTypesService,
                private _componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit(): void {
        this.nodeInfo = this._editorsService.get(this.node.type);

        try {
            this.showEditor(this.node, this.nodeInfo);
        } catch (error) {
            this.showEditor(this.node, {
                editorType: ErrorEditorComponent,
                editorOptions: {error}
            } as IEditorInfo<IErrorEditorOptions>);
        }
    }

    private showEditor<T>(node: CodeNode, editorInfo: IEditorInfo<T>) {
        if (!editorInfo || !editorInfo.editorType) {
            throw new Error(`missing editor type`);
        }
        const cmpFactory = this._componentFactoryResolver.resolveComponentFactory(editorInfo.editorType);
        this.editorHost.viewContainerRef.clear();
        const cmpRef = this.editorHost.viewContainerRef.createComponent(cmpFactory);
        const cmp = cmpRef.instance;
        cmp.node = node;
        cmp.options = editorInfo.editorOptions;
    }

    onOpenToggle(): void {
        this.opened = !this.opened;
    }
}
