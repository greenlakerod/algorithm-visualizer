import {LinkedListNode} from "./linked-list-node";

export class LinkedList<T> {
    public head: LinkedListNode<T> = null;
    public tail: LinkedListNode<T> = null;
    
    private _count: number = 0;
    public get count(): number { return this._count; }

    public addFirst(v: T | LinkedListNode<T>): void {
        if (v !== undefined && v !== null) {
            if (typeof v === "object") {
                let temp: LinkedListNode<T> = this.head;

                this.head = <LinkedListNode<T>>v;
                this.head.next = temp;

                this._count++;
                if (this._count === 1) {
                    this.tail = this.head;
                }
            } else {
                this.addFirst(new LinkedListNode<T>(v));
            }
        }
    }

    public addLast(v: T | LinkedListNode<T>): void {
        if (v !== undefined && v !== null) {
            if (typeof v === "object") {
                if (this._count === 0) {
                    this.head = <LinkedListNode<T>>v;
                } else {
                    this.tail.next = <LinkedListNode<T>>v;
                }

                this.tail = <LinkedListNode<T>>v;
                this._count++;
            } else {
                this.addLast(new LinkedListNode<T>(v));
            }
        }
    }

    public add(v: T): void {
        this.addFirst(v);
    }

    public removeFirst() {
        if (this._count > 0) {
            this.head = this.head.next;
            this._count--;

            if (this._count === 0) {
                this.tail = null;
            }
        }
    }

    public removeLast() {
        if (this._count > 0) {
            if (this._count === 1) {
                this.head = null;
                this.tail = null;
            } else {
                let current: LinkedListNode<T> = this.head;
                while (current.next != null) {
                    current = current.next;
                }
                
                current.next = null;
                this.tail = current;
            }

            this._count--;
        }
    }

    public remove(v: T): boolean {
        let previous: LinkedListNode<T> = null;
        let current: LinkedListNode<T> = this.head;

        while (current != null) {
            if (current.value === v) {
                if (previous == null) {
                    this.removeFirst();
                } else {
                    previous.next = current.next;

                    if (current.next === null) {
                        this.tail = previous;
                    }

                    this._count--;
                }

                return true;
            }

            previous = current;
            current = current.next;
        }

        return false;
    }

    public contains(v: T): boolean {
        let current: LinkedListNode<T> = this.head;
        while (current != null) {
            if (current.value === v) {
                return true;
            }

            current = current.next;
        }

        return false;
    }

    public copyTo(array: Array<T>, arrayIndex: number) {
        let current: LinkedListNode<T> = this.head;
        while (current != null) {
            array[arrayIndex++] = current.value;
            current = current.next;
        }
    }

    public clear(): void {
        this.head = null;
        this.tail = null;
        this._count = 0;
    }

    public reverse(): void {}
}