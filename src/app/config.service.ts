import { Injectable } from '@angular/core';
import {ConfigNode} from 'express-dynamic-components';
import {ConfigComponent} from './config/config.component';
import {MatDialog, MatSnackBar} from '@angular/material';

@Injectable()
export class  ConfigService {
  private _config = {} as ConfigNode;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  public get() {
    return Object.assign({}, this._config);
  }

  public replace(config: ConfigNode) {
    this._config = config;
  }

  public update(config: ConfigNode) {
    this._config = Object.assign({}, this._config, config);
  }

    public showDialog() {
        const dialogRef = this.dialog.open(ConfigComponent, {
            width: '30%',
            panelClass: 'new-message-dialog',
            data: this.get()
        });

        dialogRef.afterClosed().subscribe(result => {
            if (!result) {
                return;
            }
            const newConfig = dialogRef.componentInstance.configNode;
            if (newConfig) {
                this.replace(newConfig);

                this.snackBar.open('Config updated', null, {
                    duration: 2000
                });
            }
        });
    }
}
