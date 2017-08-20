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

    private _queue: IQueue;
    public get queue(): IQueue { return this._queue; }

    public get count(): number { return this._queue.count; }

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

    public setType(stackType: string = "linkedlist", valueType: string = "number"): void {
        if (this._queue) {
            this._queue.clear();
        }

        switch (valueType) {
            case "string":
                this._queue = stackType === "linkedlist" ? new LinkedListQueue<string>() : new ArrayQueue<string>();
                break;
            case "number":
                this._queue = stackType === "linkedlist" ? new LinkedListQueue<number>() : new ArrayQueue<number>();
                break;
            default:
                break;
        }
    }
}