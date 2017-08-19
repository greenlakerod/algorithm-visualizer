import {Queue} from "./queue";

export class ArrayQueue<T> extends Queue<T> {
    private _items: Array<T> = [];
    private _size: number = 0;
    private _head: number = 0;
    private _tail: number = -1;

    public get items(): Array<T> { return this._items; }
    public get count(): number { return this._size; }

    public enqueue(item: T): void {
        if (this._size === this._items.length) {
            let newLength: number = this._size === 0 ? 4 : this._size * 2;
            let newArray = new Array<T>(newLength);

            if (this._size > 0) {
                let targetIndex: number = 0;

                if (this._tail < this._head) {
                    for (let i = this._head; i < this._items.length; i++) {
                        newArray[targetIndex++] = this._items[i];
                    }
                    for (let i = 0; i <= this._tail; i++) {
                        newArray[targetIndex++] = this._items[i];
                    }
                } else {
                    for (let i = this._head; i < this._tail; i++) {
                        newArray[targetIndex++] = this._items[i];
                    }
                }

                this._head = 0;
                this._tail = targetIndex - 1;

            } else {
                this._head = 0;
                this._tail = -1;
            }

            this._items = newArray;
        }

        if (this._tail === this._items.length - 1) {
            this._tail = 0;
        } else {
            this._tail++;
        }

        this._items[this._tail] = item;
        this._size++;
    }
    public dequeue(): T {
        if (this.count === 0) {
            throw "Queue is empty";
        }

        let value: T = this._items[this._head];
        if (this._head === this._items.length - 1) {
            this._head = 0;
        } else {
            this._head++;
        }

        this._size--;

        return value;
    }
    public peek(): T {
        if (this.count === 0) {
            throw "Queue is empty";
        }

        return this._items[this._head];
    }
    public clear(): void {
        this._size = 0;
        this._head = 0;
        this._tail = -1;
    }
}