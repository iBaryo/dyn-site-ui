import { Injectable } from '@angular/core';
import {ConfigNode} from 'express-dynamic-components';

@Injectable()
export class  ConfigService {
  private _config = {} as ConfigNode;

  public get() {
    return Object.assign({}, this._config);
  }

  public update(config: ConfigNode) {
    this._config = Object.assign({}, this._config, config);
  }
}
