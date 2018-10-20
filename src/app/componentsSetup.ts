import {
    DomComponent, FeatureComponent,
    HtmlPageComponent,
    ICodeComponentType,
    JsonEndpointComponent, JsonEndpointNode, ScopedScriptComponent, ScriptTagComponent,
    ServerCodeComponent
} from 'express-dynamic-components';
import {Type} from '@angular/core';
import {INodeTypes} from './node-types.service';
import {CodeEditorComponent, ICodeEditorOptions} from './editors/code-editor/code-editor.component';
import {HtmlPageEditorComponent} from './editors/html-page-editor/html-page-editor.component';
import {EndpointEditorComponent} from './editors/endpoint-editor/endpoint-editor.component';
import {GigyaApi, GigyaWebSDK} from '../custom-components';

export interface ITypeContainer {
    add(alignment: keyof INodeTypes, cmpType: ICodeComponentType<any>, editorType: Type<any>, editorOptions?: any): void;
}

export function setupTypes(container: ITypeContainer) {
    container.add('backend', ServerCodeComponent, CodeEditorComponent, {
        defaultTemplate: `async (app, config) => {\n\t\n}`
    } as ICodeEditorOptions);
    container.add('backend', JsonEndpointComponent, EndpointEditorComponent, {
        defaultTemplate: `async (req, config) => {\n\t\n}`
    } as ICodeEditorOptions);
    container.add('backend', HtmlPageComponent, HtmlPageEditorComponent);

    container.add('frontend', DomComponent, CodeEditorComponent, {
        defaultTemplate: `<div></div>`,
        language: 'html'
    } as ICodeEditorOptions);
    container.add('frontend', ScriptTagComponent, CodeEditorComponent, {
        defaultTemplate: 'console.log("hello world");'
    } as ICodeEditorOptions);
    container.add('frontend', ScopedScriptComponent, CodeEditorComponent, {
        defaultTemplate: `async (config) => {\n\t\n}`
    } as ICodeEditorOptions);

    container.add('features', class MyFeature extends FeatureComponent {
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

    setupCustomTypes(container);
}

function setupCustomTypes(container: ITypeContainer) {
    container.add('backend', GigyaApi, CodeEditorComponent, {
            defaultTemplate: `async (gigyaApi, config) => {
    
}`
    } as ICodeEditorOptions);

    container.add('frontend', GigyaWebSDK, CodeEditorComponent, {
        defaultTemplate: `(websdk, config) => {
            
}`
    } as ICodeEditorOptions);
}