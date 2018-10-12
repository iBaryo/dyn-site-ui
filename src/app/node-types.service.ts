import {Injectable, Type} from '@angular/core';
import {
    CodeNode,
    ICodeComponentType,
    backendFactory,
    frontendFactory,
    CodeFactory,
} from 'express-dynamic-components';
import {INodeEditor} from './editors/interfaces';
import {setupTypes, ITypeContainer} from "./componentsSetup";

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
export class NodeTypesService implements ITypeContainer {
    private readonly _types: INodeTypes = {
        features: new Map<string, INodeTypeInfo>(),
        backend: new Map<string, INodeTypeInfo>(),
        frontend: new Map<string, INodeTypeInfo>(),
    };

    constructor() {
        setupTypes(this);
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

    public hasFeatures() {
        return this._types.features.size > 0;
    }

    public getTypeNames(alignment: keyof INodeTypes) {
        return Array.from(this._types[alignment].keys());
    }
}
