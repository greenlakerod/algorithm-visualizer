import {Queue} from "./queue";

export class ArrayQueue<T> extends Queue<T> {
    private _items: Array<T> = [];
    private _slots: Array<boolean>;
    private _size: number = 0;
    private _head: number = 0; // the index of the first (oldest) item in the queue
    private _tail: number = -1; // the index of the last (newest) item in the queue

    public get items(): Array<T> { return this._items; }
    public get slots(): Array<boolean> { return this._slots; }
    public get count(): number { return this._size; }

    // Adds an item to the back of the queue
    public enqueue(item: T): void {
        if (this._size === this._items.length) {
            let newLength: number = this._size === 0 ? 4 : this._size * 2;
            let newArray = new Array<T>(newLength);
            this._slots = Array<boolean>(newLength).fill(false);

            // if the array needs to grow
            if (this._size > 0) {

                // copy contents...
                // if the array has no wrapping, just copy the valid range
                // else copy from head to end of the array and then from 0 to the tail
                // if tail is less than head we've wrapped
                let targetIndex: number = 0;
                
                if (this._tail < this._head) {
                    // copy the _items[head].._items[end] -> newArray[0]..newArray[N]
                    for (let i = this._head; i < this._items.length; i++) {
                        this._slots[targetIndex] = true;
                        newArray[targetIndex++] = this._items[i];
                    }

                    // copy _items[0].._items[tail] -> newArray[N+1]..
                    for (let i = 0; i <= this._tail; i++) {
                        this._slots[targetIndex] = true;
                        newArray[targetIndex++] = this._items[i];
                    }
                } else {
                    // copy the _items[head].._items[tail] -> newArray[0]..newArray[N]
                    for (let i = this._head; i < this._tail; i++) {
                        this._slots[targetIndex] = true;
                        newArray[targetIndex++] = this._items[i];
                    }
                }

                this._head = 0;
                this._tail = targetIndex - 1; // compensate for the extra bump

            } else {
                this._head = 0;
                this._tail = -1;
            }

            this._items = newArray;
        }

        // now we have a properly sized array and can focus on wrapping issues.
        // if _tail is at the end of the array we need to wrap around
        if (this._tail === this._items.length - 1) {
            this._tail = 0;
        } else {
            this._tail++;
        }

        this._slots[this._tail] = true;
        this._items[this._tail] = item;
        this._size++;
    }
    public dequeue(): T {
        if (this.count === 0) {
            throw "Queue is empty";
        }

        let value: T = this._items[this._head];
        this._slots[this._head] = false;

        if (this._head === this._items.length - 1) {
            // if the head is at the last index in the array - wrap around.
            this._head = 0;
        } else {
            // move to the next value
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