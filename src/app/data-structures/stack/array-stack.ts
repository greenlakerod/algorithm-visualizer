import {Stack} from "./stack";

export class ArrayStack<T> extends Stack<T> {
    private _items: Array<T> = [];
    private _size: number = 0;

    public get size(): number { return this._size; }
    public get items(): Array<T> { return this._items; }

    public push(item: T): void {
        if (this._size === this._items.length) {
            let newLength: number = this._size === 0 ? 4 : this._size * 2;
            let newArray = new Array<T>(newLength);

            this._items = this._items.concat(newArray);
        }

        this._items[this._size++] = item;
    }
    public pop(): T {
        if (this._size === 0) {
            throw "Stack is empty";
        }

        return this._items[--(this._size)];
    }
    public peek(): T {
        if (this._size === 0) {
            throw "Stack is empty";
        }

        return this._items[this._size - 1];
    }
    public clear(): void {
        this._size = 0;
    }
}