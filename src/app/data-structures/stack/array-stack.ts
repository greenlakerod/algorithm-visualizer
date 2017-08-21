import {Stack} from "./stack";

export class ArrayStack<T> extends Stack<T> {
    private _items: Array<T> = [];
    private _slots: Array<boolean>;
    private _size: number = 0;

    public get size(): number { return this._size; }
    public get items(): Array<T> { return this._items; }
    public get slots(): Array<boolean> { return this._slots; }

    public push(item: T): void {
        if (this._size === this._items.length) {
            let newLength: number = this._size === 0 ? 4 : this._size * 2;
            let newArray = new Array<T>(newLength);
            this._slots = Array<boolean>(newLength).fill(false);

            this._items.forEach((v, index) => {
                newArray[index] = v;
                this._slots[index] = true;
            });

            this._items = newArray;
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