import {Component, Input, OnInit} from '@angular/core';
import {CodeNode} from 'express-dynamic-components';
import {NewMessageComponent} from '../new-message/new-message.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {INodeTypes} from '../node-types.service';

@Component({
  selector: 'app-nodes-list',
  templateUrl: './nodes-list.component.html',
  styleUrls: ['./nodes-list.component.scss']
})
export class NodesListComponent implements OnInit {
  @Input()
  public title: string;
  @Input()
  public nodes: CodeNode[];
  @Input()
  public alignment: keyof INodeTypes;
  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
  }


    onRemove(index: number): void {
        this.nodes.splice(index, 1);
        this.snackBar.open('Component deleted', null, {
            duration: 2000
        });
    }

    onNewComponent(): void {
        const dialogRef = this.dialog.open(NewMessageComponent, {
            width: '75%',
            panelClass: 'new-message-dialog',
            data: {alignment: this.alignment}
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.nodes.push(dialogRef.componentInstance.node);

                this.snackBar.open('Component added', null, {
                    duration: 2000
                });
            }
        });
    }
}
