import {Injectable, Type} from '@angular/core';
import {
    CodeNode,
    ICodeComponentType,
    backendFactory,
    frontendFactory,
    CodeFactory,
    ServerCodeComponent,
    JsonEndpointComponent,
    HtmlPageComponent,
    DomComponent,
    ScriptTagComponent,
    ScopedScriptComponent,
    FeatureComponent,
    JsonEndpointNode
} from 'express-dynamic-components';
import {INodeEditor} from './editors/interfaces';
import {CodeEditorComponent, ICodeEditorOptions} from './editors/code-editor/code-editor.component';
import {HtmlPageEditorComponent} from './editors/html-page-editor/html-page-editor.component';

export interface IEditorInfo<T> {
    editorType: Type<INodeEditor<T>>;
    editorOptions?: T;
}

export interface INodeTypeInfo extends IEditorInfo<any> {
    alignment: keyof INodeTypes;
    componentType: ICodeComponentType<any>;
}

export interface IAlignments<T> {
    features: T;
    backend: T;
    frontend: T;
}

export interface INodeTypes extends IAlignments<Map<string, INodeTypeInfo>> {
}

@Injectable()
export class NodeTypesService {
    private readonly _types: INodeTypes = {
        features: new Map<string, INodeTypeInfo>(),
        backend: new Map<string, INodeTypeInfo>(),
        frontend: new Map<string, INodeTypeInfo>(),
    };

    constructor() {
        this.add('backend', ServerCodeComponent, CodeEditorComponent, {
            defaultTemplate: `async (app, config) => {\n\t\n}`
        } as ICodeEditorOptions);
        this.add('backend', JsonEndpointComponent, CodeEditorComponent, {
            defaultTemplate: `async (req, config) => {\n\t\n}`
        } as ICodeEditorOptions);
        this.add('backend', HtmlPageComponent, HtmlPageEditorComponent);

        this.add('frontend', DomComponent, CodeEditorComponent, {
            defaultTemplate: `<div></div>`,
            language: 'html'
        } as ICodeEditorOptions);
        this.add('frontend', ScriptTagComponent, CodeEditorComponent, {
            defaultTemplate: 'console.log("hello world");'
        } as ICodeEditorOptions);
        this.add('frontend', ScopedScriptComponent, CodeEditorComponent, {
            defaultTemplate: `async (config) => {\n\t\n}`
        } as ICodeEditorOptions);

        this.add('features', class MyFeature extends FeatureComponent {
            public static get typeName() {
                return 'my-feature';
            }

            private readonly _endpointName = 'myFeatureEndpoint';

            public get backend() {
                return [
                    {
                        type: JsonEndpointComponent.typeName,
                        desc: 'my-feature endpoint',
                        name: this._endpointName,
                        code: async (req, config) => ({myFeature: true, query: req.query})
                    } as JsonEndpointNode
                ];
            }

            public get frontend() {
                return {
                    defaultPage: {
                        head: [],
                        body: [
                            {
                                type: ScriptTagComponent.typeName,
                                desc: 'my-feature script',
                                code: `
fetch('${this._endpointName}'+location.search)
.then(r => r.json())
.then(r => window.testResults.featureEndpointResult = r);`
                            }
                        ]
                    }
                };
            }
        }, undefined);
    }

    public add(alignment: keyof INodeTypes, cmpType: ICodeComponentType<any>, editorType: Type<any>, editorOptions?: any) {
        const componentFactory = this.getFactory(alignment);
        let componentType = componentFactory.get(cmpType.typeName);

        if (!componentType) {
            componentFactory.addType(cmpType);
            componentType = cmpType;
        } else if (componentType !== cmpType) {
            throw new Error(`component type '${cmpType.typeName}' already exists`);
        }

        this._types[alignment].set(componentType.typeName, {
            alignment,
            componentType,
            editorType,
            editorOptions
        });
    }

    private getFactory(alignment: keyof INodeTypes): CodeFactory<any> {
        switch (alignment) {
            case 'features':
            case 'backend':
                return backendFactory;
            case 'frontend':
                return frontendFactory;
            default:
                throw new Error('unsupported editor alignment - must be features, backend or frontend');
        }
    }

    public get(typeName: string) {
        return this.getAllComponentsMap().get(typeName);
    }

    public getAllComponentsMap() {
        return new Map<string, INodeTypeInfo>(
            // Object.values(this._types).reduce((res, typesMap) => res.concat(...typesMap), [])
            [
                ...this._types.features,
                ...this._types.backend,
                ...this._types.frontend,
            ]
        );
    }

    public align(typedNodes: CodeNode[]) {
        const nodes: IAlignments<CodeNode[]> = {
            features: [],
            backend: [],
            frontend: []
        };
        const components = this.getAllComponentsMap();
        typedNodes.forEach(typedNode => {
            const cmp = components.get(typedNode.type);
            if (cmp) {
                nodes[cmp.alignment].push(typedNode);
            }
        });

        return nodes;
    }
}
