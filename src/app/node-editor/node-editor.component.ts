import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {CodeNode} from 'express-dynamic-components';
import {IEditorInfo, NodeTypesService} from '../node-types.service';
import {ErrorEditorComponent, IErrorEditorOptions} from '../editors/error-editor/error-editor.component';
import {EditorHostDirective} from '../editor-host.directive';

@Component({
    selector: 'app-node-editor',
    templateUrl: './node-editor.component.html',
    styleUrls: ['./node-editor.component.scss']
})
export class NodeEditorComponent implements OnInit {
    @Input()
    public node: CodeNode;

    @ViewChild(EditorHostDirective)
    public editorHost: EditorHostDirective;

    constructor(private _componentFactoryResolver: ComponentFactoryResolver,
                private _editorsService: NodeTypesService) {
    }

    public ngOnInit(): void {
        try {
            const typeInfo = this._editorsService.get(this.node.type);
            this.showEditor(this.node, typeInfo);
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

}
