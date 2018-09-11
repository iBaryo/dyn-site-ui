import {IAppComponentsConfig, CodeNode} from 'express-dynamic-components';
import {Injectable} from '@angular/core';

@Injectable()
export class NodesService {

    constructor() {
    }

    public getNodes() {
        return {
            config: [],
            code: [
                {
                    type: 'server',
                    desc: 'setup of the server',
                    code: ''
                },
                {
                    type: 'endpoint',
                    desc: 'serving data',
                    code: ''
                },
                {
                    type: 'html',
                    desc: 'a nice page',
                    code: ''
                },
                {
                    type: 'my-feature',
                    desc: 'a cool feature'
                }
            ]
        } as IAppComponentsConfig;
    }
}
