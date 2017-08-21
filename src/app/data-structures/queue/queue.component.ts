import {Component, OnInit} from "@angular/core";
import {IQueue} from "./queue";
import {ArrayQueue} from "./array-queue";
import {LinkedListQueue} from "./linked-list-queue";

@Component({
    selector: "queue",
    styleUrls: ["../../data-structure.css", "./queue.component.css"],
    templateUrl: "./queue.component.html"
})
export class QueueComponent implements OnInit {
    public dequeuedItem: any;
    public peekedItem: any;
    private _queueType = "linkedlist";
    private _dataType = "number";

    private _queue: IQueue;
    public get queue(): IQueue { return this._queue; }
    public get count(): number { return this._queue.count; }
    public get queueType(): string { return this._queueType; }
    public get dataType(): string { return this._dataType; }

    public ngOnInit(): void {
        this.setType();
    }

    public enqueue(item: any): void {
        if (item !== undefined && item !== "") {
            this._queue.enqueue(item);
        }
    }
    public dequeue(): void {
        try {
            this.dequeuedItem = this._queue.dequeue();
        } catch (error) {
            alert(error.message || error);
        }
    }
    public peek(): any {
        try {
            this.peekedItem = this._queue.peek();
        } catch (error) {
            alert(error.message || error);
        }       
    }
    public clear(): void {
        this._queue.clear();
    }

    public onQueueTypeChange(type: string): void {
        this._queueType = type;
        this.setType();
    }

    public onDataTypeChange(type: string): void {
        this._dataType = type;
        this.setType();
    }

    public setType(): void {
        if (this._queue) {
            this._queue.clear();
        }

        switch (this._dataType) {
            case "string":
                this._queue = this._queueType === "linkedlist" ? new LinkedListQueue<string>() : new ArrayQueue<string>();
                break;
            case "number":
                this._queue = this._queueType === "linkedlist" ? new LinkedListQueue<number>() : new ArrayQueue<number>();
                break;
            default:
                break;
        }
    }
}