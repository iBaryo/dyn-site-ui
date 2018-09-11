import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
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

@NgModule({
    declarations: [
        AppComponent,
        NodeComponent,
        NewMessageComponent,
        EditorHostDirective,
        ErrorEditorComponent,
        CodeEditorComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
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
        MatSlideToggleModule
    ],
    entryComponents: [
        NewMessageComponent,
        ErrorEditorComponent,
        CodeEditorComponent
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
