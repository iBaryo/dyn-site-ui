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
import {NodeTypesService} from "./node-types.service";

@NgModule({
    declarations: [
        AppComponent,
        NodeComponent,
        NewMessageComponent
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
        NewMessageComponent
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
