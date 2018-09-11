import {Component, HostBinding, ViewEncapsulation, Input, Output, EventEmitter, OnInit} from '@angular/core';
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
                            <button
                                    [matMenuTriggerFor]="snoozeMenu"
                                    mat-icon-button
                                    matTooltip="Remind Me..."
                                    matTooltipPosition="above">
                                <mat-icon>alarm</mat-icon>
                            </button>
                            <mat-menu class="snooze-menu" #snoozeMenu="matMenu" [overlapTrigger]="false"
                                      xPosition="before">
                                <h3>Snooze until...</h3>
                                <hr/>
                                <button mat-menu-item>
                                    <mat-icon>brightness_6</mat-icon>
                                    Later Today
                                </button>
                                <button mat-menu-item>
                                    <mat-icon>brightness_5</mat-icon>
                                    Tomorrow
                                </button>
                                <button mat-menu-item>
                                    <mat-icon>today</mat-icon>
                                    Later this week
                                </button>
                            </mat-menu>
                            <button mat-icon-button (click)="removed.emit()" matTooltip="Delete"
                                    matTooltipPosition="above">
                                <mat-icon>delete</mat-icon>
                            </button>
                            <button mat-icon-button (click)="removed.emit()" matTooltip="Done"
                                    matTooltipPosition="above">
                                <mat-icon>done</mat-icon>
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
                                    Reply
                                </button>
                                <button mat-menu-item (click)="onReply()">
                                    <mat-icon>forward</mat-icon>
                                    Forward
                                </button>
                                <hr/>
                                <button mat-menu-item>
                                    <mat-icon>print</mat-icon>
                                    Print
                                </button>
                            </mat-menu>
                        </div>
                        <div #editorContainer></div>
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

    @Output() removed = new EventEmitter<void>();
    @Output() reply = new EventEmitter<{ to: string, subject: string }>();

    constructor(private _editorsService: NodeTypesService) {

    }

    ngOnInit(): void {
        this.nodeInfo = this._editorsService.get(this.node.type);

        if (!this.nodeInfo) {
            this.nodeInfo = {
                alignment: 'error',
                componentType: null,
                editorType: null // todo: error editor
            };
        }
    }

    onOpenToggle(): void {
        this.opened = !this.opened;
    }

    onReply(): void {
        this.reply.emit({
            // to: this.from,
            // subject: `RE: ${this.subject}`
        } as any);
    }
}
