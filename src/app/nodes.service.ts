import {IAppComponentsConfig, CodeNode} from 'express-dynamic-components';
import {Injectable} from '@angular/core';
import {cmp} from "semver";

@Injectable()
export class NodesService {

    constructor() {
    }

    public getInitCmpConfig() {
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

    public exportToFile(compConfig: IAppComponentsConfig, fileName = 'compConfig.json') {
        const jsonStr = JSON.stringify(compConfig, undefined, 4);

        const element = document.createElement('a');
        element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(jsonStr)}`);
        element.setAttribute('download', fileName);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    public importFromFile(file: File) {
        return new Promise<IAppComponentsConfig>((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = error => reject(error);
            reader.onload = (event: Event & { target: { result?: string } }) => {
                try {
                    const cmpConfig = JSON.parse(event.target.result) as IAppComponentsConfig;
                    this.validateCmpConfig(cmpConfig);
                    resolve(cmpConfig);
                } catch (e) {
                    reject(e);
                }
            };
            reader.readAsBinaryString(file);
        });
    }

    private validateCmpConfig(cmpConfig: IAppComponentsConfig) {
        if (!cmpConfig || !cmpConfig.code || !(cmpConfig.code instanceof Array)) {
            throw new Error('bad config');
        }
    }
}
