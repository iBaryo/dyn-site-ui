import {Component, Input, OnInit} from '@angular/core';
import {CodeNode} from 'express-dynamic-components';
import {NewMessageComponent} from '../new-message/new-message.component';
import {MatDialog, MatSnackBar} from '@angular/material';

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
  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {
  }


    onRemove(index: number): void {
        this.nodes.splice(index, 1);
    }

    onNewMessage(data: any = {}): void {
        const dialogRef = this.dialog.open(NewMessageComponent, {
            width: '75%',
            panelClass: 'new-node-dialog',
            data
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.snackBar.open('Email sent!', null, {
                    duration: 2000
                });
            }
        });
    }
}