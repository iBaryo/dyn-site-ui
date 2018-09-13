import {CodeNode} from 'express-dynamic-components';

export interface INodeEditor<T> {
    node: CodeNode;
    options: T;
}
