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
                    head: [
                        {
                            type: 'dom',
                            desc: 'a dom element',
                            code: `<div></div>`
                        }
                    ],
                    body: [
                        {
                            type: 'script',
                            desc: 'a dom script tag',
                            code: `async (config) => 'console.log("hello");'`
                        }
                    ]
                },
                {
                    type: 'my-feature',
                    desc: 'a cool feature'
                }
            ]
        } as IAppComponentsConfig;
    }
}
