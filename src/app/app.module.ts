import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatSidenavModule, MatToolbarModule, MatButtonModule, MatIconModule,
    MATERIAL_COMPATIBILITY_MODE, MatCardModule, MatMenuModule, MatTooltipModule,
    MatDialogModule, MatChipsModule, MatAutocompleteModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule, MatSlideToggleModule, MatExpansionModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';
import {NodeComponent} from './node/node.component';
import {NewMessageComponent} from './new-message/new-message.component';
import {routes} from './app.routes';
import {NodesService} from './nodes.service';
import {NodeTypesService} from './node-types.service';
import { EditorHostDirective } from './editor-host.directive';
import { ErrorEditorComponent } from './editors/error-editor/error-editor.component';
import { CodeEditorComponent } from './editors/code-editor/code-editor.component';
import {MonacoEditorModule} from 'ngx-monaco-editor';
import { NodesListComponent } from './nodes-list/nodes-list.component';
import { HtmlPageEditorComponent } from './editors/html-page-editor/html-page-editor.component';

@NgModule({
    declarations: [
        AppComponent,
        NodeComponent,
        NewMessageComponent,
        EditorHostDirective,
        ErrorEditorComponent,
        CodeEditorComponent,
        NodesListComponent,
        HtmlPageEditorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes, {
            useHash: false
        }),
        FlexLayoutModule,
        MatSidenavModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatTooltipModule,
        MatDialogModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MonacoEditorModule // use forRoot() in main app module only.
    ],
    entryComponents: [
        NewMessageComponent,
        ErrorEditorComponent,
        CodeEditorComponent,
        HtmlPageEditorComponent
    ],
    providers: [
        {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true},
        NodesService,
        NodeTypesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
