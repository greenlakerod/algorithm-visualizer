import {Queue} from "./queue";
import {LinkedList} from "../linked-list/linked-list";

export class LinkedListQueue<T> extends Queue<T> {
    private _list: LinkedList<T> = new LinkedList<T>();
    private _slots: Array<boolean> = [];

    public get count(): number { return this._list.count; }
    public get items(): Array<T> {
        if (this.count === 0) {
            return [];
        }

        let a: Array<T> = new Array<T>(this.count);
        this._list.copyTo(a);

        return a;
    }
    public get slots(): Array<boolean> { return this._slots; }

    public enqueue(item: T): void {
        if (this._list.count >= this._slots.length) {
            this._slots.push(true);
        }
        this._list.addLast(item);
    }
    public dequeue(): T {
        if (this.count === 0) {
            throw "Queue is empty";
        }

        let value: T = this._list.head.value;
        this._list.removeFirst();

        this._slots.splice(this._slots.length - 1, 1);

        return value;
    }
    public peek(): T {
        if (this.count === 0) {
            throw "Queue is empty";
        }

        return this._list.head.value;
    }
    public clear(): void {
        this._list.clear();
        this._slots.splice(0);
    }
}
