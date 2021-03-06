import {Stack} from "./stack";
import {LinkedList} from "../linked-list/linked-list";

export class LinkedListStack<T> extends Stack<T> {
    private _list: LinkedList<T> = new LinkedList<T>();
    private _slots: Array<boolean> = [];

    public get size(): number { return this._list.count; }
    public get slots(): Array<boolean> { return this._slots; }
    public get items(): Array<T> {
        if (this.size === 0) {
            return [];
        }

        let a: Array<T> = new Array<T>(this.size);
        this._list.copyTo(a);

        return a;
    }

    public push(item: T): void {
        this._slots.push(true);
        this._list.addFirst(item);
    }
    public pop(): T {
        if (this.size === 0) {
            throw "Stack is empty"; 
        }

        let value: T = this._list.head.value;
        this._list.removeFirst();

        this._slots.splice(this._slots.length - 1);

        return value;
    }
    public peek(): T {
        if (this.size === 0) {
            return null;
        }

        return this._list.head.value;
    }
    public clear(): void {
        this._list.clear();
        this._slots.splice(0);
    }
}