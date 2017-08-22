import {INode} from "../data-structure-node";

export interface ILinkedListNode extends INode {
    value: any;
    next: ILinkedListNode;
}

export class LinkedListNode<T> implements ILinkedListNode {
    public next: LinkedListNode<T>;
    public compareTo = (v: T): number => {
        if (this.value > v) { return 1; }
        if (this.value < v) { return -1; }
        return 0;
    };

    constructor(public value: T) {
        this.value = value;
        this.next = null;
    }
}