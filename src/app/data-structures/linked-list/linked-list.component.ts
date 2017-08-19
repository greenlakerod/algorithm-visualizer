import {Component, OnInit} from "@angular/core";

import {ILinkedList, LinkedList} from "./linked-list";
import {ILinkedListNode} from "./linked-list-node";

@Component({
    selector: "linked-list",
    styleUrls: ["./linked-list.component.css"],
    templateUrl: "./linked-list.component.html"
})
export class LinkedListComponent implements OnInit {
    //private _nodes: Array<ILinkedListNode> = [];
    private _list: ILinkedList;
    public get list(): ILinkedList { return this._list; }

    public get head(): ILinkedListNode { return this._list.head; }
    public get tail(): ILinkedListNode { return this._list.tail; }
    public get count(): number { return this._list.count; }

    // public get nodes(): Array<ILinkedListNode> {
    //     this._nodes = [];
    //     this._list.copyTo(this._nodes);
    //     return this._nodes;
    // }

    public ngOnInit(): void {
        this.setType();
    }

    public setType(type: string = "number"): void {
        if (this._list) {
            this._list.clear();
        }

        switch (type) {
            case "string":
                this._list = new LinkedList<string>();
                break;
            case "number":
                this._list = new LinkedList<number>();
                break;
            default:
                break;
        }
    }

    public add(v: any, index?: number): void {
        this._list.add(v, index);
    }
    public addFirst(v: any | ILinkedListNode): void {
        this._list.addFirst(v);
    }
    public addLast(v: any | ILinkedListNode): void {
        this._list.addLast(v);
    }   
    public remove(v: any): boolean {
        return this._list.remove(v);
    }
    public removeAt(index: number): boolean {
        return this._list.removeAt(index);
    }
    public removeFirst(): boolean {
        return this._list.removeFirst();
    }
    public removeLast(): boolean {
        return this._list.removeLast();
    }
    public clear(): void {
        this._list.clear();
    }
    public reverse(): void {
        this._list.reverse();
    }
}

