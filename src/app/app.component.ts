import {Component, ViewEncapsulation} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {CodeNode, IAppComponentsConfig} from 'express-dynamic-components';
import {NewMessageComponent} from './new-message/new-message.component';
import {NodesService} from './nodes.service';
import {IAlignments, NodeTypesService} from './node-types.service';

@Component({
    selector: 'app-root',
    template: `
        <mat-sidenav-container class="sidenav-container">
            <mat-sidenav #sidenav class="sidenav-nav">
                <mat-list>
                    <mat-list-item>
                        <button mat-button routerLink="/" routerLinkActive>
                            <mat-icon>inbox</mat-icon>
                            Inbox
                        </button>
                    </mat-list-item>
                    <mat-list-item>
                        <button mat-button routerLink="/snoozed" routerLinkActive>
                            <mat-icon>alarm</mat-icon>
                            Snoozed
                        </button>
                    </mat-list-item>
                    <mat-list-item>
                        <button mat-button routerLink="/done" routerLinkActive>
                            <mat-icon>done</mat-icon>
                            Done
                        </button>
                    </mat-list-item>
                    <mat-list-item>
                        <hr/>
                    </mat-list-item>
                    <mat-list-item>
                        <button mat-button routerLink="/drafts" routerLinkActive>
                            <mat-icon>drafts</mat-icon>
                            Drafts
                        </button>
                    </mat-list-item>
                    <mat-list-item>
                        <button mat-button routerLink="/sent" routerLinkActive>
                            <mat-icon>send</mat-icon>
                            Sent
                        </button>
                    </mat-list-item>
                    <mat-list-item>
                        <button mat-button routerLink="/spam" routerLinkActive>
                            <mat-icon>report_problem</mat-icon>
                            Spam
                        </button>
                    </mat-list-item>
                </mat-list>
            </mat-sidenav>
            <div class="sidenav-content">
                <mat-toolbar color="primary" role="header" fxLayout="row" class="primary-toolbar">
                    <div class="sidenav-button" fxFlex="50px">
                        <button type="button" class="menu-btn" mat-icon-button (click)="sidenav.open()">
                            <mat-icon>menu</mat-icon>
                        </button>
                    </div>
                    <div fxFlex="100px">
                        Site Wizard
                    </div>
                    <div fxFlex fxFill class="search-col">
                        <input type="text" class="search-bar" placeholder="Search..."/>
                        <mat-slide-toggle class="pin-toggle"></mat-slide-toggle>
                    </div>
                    <div fxFlex="200px" class="avatar-col">
            <span class="avatar accent-1 large">
              DM
            </span>
                    </div>
                </mat-toolbar>
                <content>
                    <app-nodes-list *ngIf="showFeatures" [title]="'Features'"
                                    [nodes]="alignedNodes.features"></app-nodes-list>
                    <app-nodes-list [title]="'Backend'" [nodes]="alignedNodes.backend"></app-nodes-list>
                </content>
                <div class="global-actions">
                    <button
                            mat-fab
                            color="accent"
                            class="new-fab"
                            (click)="export()"
                            matTooltip="export"
                            matTooltipPosition="above">
                        <mat-icon>cloud_download</mat-icon>
                    </button>
                    <button
                            type="file"
                            mat-fab
                            color="none"
                            class="new-fab"
                            (click)="filePicker.click()"
                            matTooltip="import"
                            matTooltipPosition="above">
                        <mat-icon>cloud_upload</mat-icon>
                    </button>
                    <input #filePicker type="file" style="display: none" accept="application/json" (change)="import($event)"/>
                </div>
            </div>
        </mat-sidenav-container>
    `,
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public alignedNodes: IAlignments<CodeNode[]>;
    public showFeatures = false;

    constructor(private snackBar: MatSnackBar,
                private dialog: MatDialog,
                private _nodesService: NodesService,
                private _nodeTypesService: NodeTypesService) {
        this.showFeatures = this._nodeTypesService.hasFeatures();
        this.showNodes(this._nodesService.getInitCmpConfig());
    }

    private showNodes(cmpConfig: IAppComponentsConfig) {
        const codeNodes = cmpConfig.code;
        this.alignedNodes = this._nodeTypesService.align(codeNodes);
    }

    private getCompConfig() {
        return {
            config: [],
            code: Object.values(this.alignedNodes).reduce((res, cur) => res.concat(cur), [])
        };
    }

    public export() {
        this._nodesService.exportToFile(this.getCompConfig());
    }

    public async import(event) {
        const file = (event.srcElement as HTMLInputElement).files[0];
        if (file) {
            try {
                const cmpConfig = await this._nodesService.importFromFile(file);
                this.showNodes(cmpConfig);
            } catch (e) {
                this.snackBar.open('Invalid config file', null, {
                    duration: 2000
                });
            }
        }
    }
}
