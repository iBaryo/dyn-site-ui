import Gigya from 'gigya';
import {IScript, ScopedScriptComponent, ScriptTagComponent, ServerCodeComponent} from 'express-dynamic-components';
import {ScriptGeneratorFn, ScriptNode} from 'express-dynamic-components/src/code-components/frontend/ScriptTagComponent';

export class GigyaApi extends ServerCodeComponent {
    public static get typeName() {
        return `gigya-api`;
    }

    public run(options: any, fn: any) {
        return super.run(options, async (app: Express.Application & { gigya?: Gigya }, config) => {
            if (!app.gigya) {
                app.gigya = new Gigya(config.apiKey, config.dataCenter, config.userKey, config.secret);
            }
            fn(app.gigya, config);
        });
    }
}

export class GigyaWebSDKLoader extends ScriptTagComponent {
    public static get typeName() {
        return `gigya-load-websdk`;
    }

    public run(options: ScriptNode, fn: ScriptGeneratorFn, oreq: any) {
        return super.run(options, async (req, config) => {
            let domain: string;
            switch (config.dataCenter) {
                case 'cn1':
                    domain = 'cn1.gigya-api.cn';
                    break;
                default:
                    domain = 'gigya.com';
            }
            return {
                src: `https://cdns.${domain}/js/gigya.js?apiKey=${config.apiKey}`
            } as IScript;
        }, oreq);
    }
}
export class GigyaWebSDKScript extends ScopedScriptComponent {
    public static get typeName() {
        return `gigya-websdk-script`;
    }

    protected getScopeArgs() {
        return [
            'window.gigya',
            'window.config'
        ];
    }
}
export class GigyaWebSDK extends GigyaWebSDKScript {
    public static get typeName() {
        return `gigya-websdk`;
    }

    public async run(options: ScriptNode, fn) {
        const info = this.getWebSDKInfo();
        const activateFnString = `fn(${this.getScopeArgs().join(',')})`;
        return super.run(options, `var fn = ${fn.toString()};
        if (window.gigya && window.gigya.isGigya) {
            ${activateFnString};
        }
        else {
            var cb = window.onGigyaServiceReady;
            window.onGigyaServiceReady = () => {
                if (cb) cb();
                ${activateFnString};
            };

            var gScript = document.createElement('script');
            gScript.src = 'https://cdns.${info.domain}/js/gigya.js?apiKey=${info.apiKey}'
            document.head.appendChild(gScript);
        }
        `);
    }
    private getWebSDKInfo(config = this.context.config) {
        let domain: string;
        switch (config.dataCenter) {
            case 'cn1':
                domain = 'cn1.gigya-api.cn';
                break;
            default:
                domain = 'gigya.com';
        }
        return {
            domain,
            apiKey: config.apiKey
        };
    }
}