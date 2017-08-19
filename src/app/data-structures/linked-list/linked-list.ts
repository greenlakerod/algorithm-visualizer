import {ILinkedListNode, LinkedListNode} from "./linked-list-node";

export interface ILinkedList {
    head: ILinkedListNode;
    tail: ILinkedListNode;
    count: number;

    add: (v: any, index?: number) => void;
    addFirst: (v: any | ILinkedListNode) => void;
    addLast: (v: any | ILinkedListNode) => void;
    
    remove: (v: any) => boolean;
    removeAt: (index: number) => boolean;
    removeFirst: () => boolean;
    removeLast: () => boolean;

    clear: () => void;
    contains: (v: any) => boolean;
    copyTo: (array: Array<any>, arrayIndex?: number) => void;
    reverse: () => void;

    nodes: Array<ILinkedListNode>;//nodes: () => IterableIterator<ILinkedListNode>;
}

export class LinkedList<T> implements ILinkedList {
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
    public add(v: T, index?: number): void {
        if (this._count === 0 || index === undefined || index <= 0) {
            this.addFirst(v);
        } else if (index >= this._count) {
            this.addLast(v);
        } else {
            index = parseInt(index.toString()); //in case it comes in as string
            let current: LinkedListNode<T> = this.head;
            let i = 0;
            while (++i < index) {
                current = current.next;
            }

            let newNode: LinkedListNode<T> = new LinkedListNode<T>(v);
            newNode.next = current.next;
            current.next = newNode;

            this._count++;
        }
    }
    public removeFirst(): boolean {
        if (this._count > 0) {
            this.head = this.head.next;
            this._count--;

            if (this._count === 0) {
                this.tail = null;
            }

            return true;
        }

        return false;
    }
    public removeLast(): boolean {
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
            return true;
        }

        return false;
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
    public removeAt(index: number): boolean {
        if (this._count === 0 || index === undefined || index < 0 || index >= this._count) {
            throw "Invalid index";
        }

        if (index === 0) {
            return this.removeFirst();
        }
        if (index === this._count - 1) {
            return this.removeLast();
        }

        let current: LinkedListNode<T> = this.head;
        let i = 0;
        while (++i < index) {
            current = current.next;
        }

        current.next = current.next.next;
        this._count--;

        return true;
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
    public copyTo(array: Array<T>, arrayIndex: number = 0): void {
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
    public reverse(): void {
        if (this._count > 0) {
            let h: LinkedListNode<T> = this.head;
            let n: LinkedListNode<T> = null;
    
            while (h.next != null) {
                n = h.next;
                h.next = n.next;
                n.next = this.head;
                this.head = n;
            }

            this.tail = h;
        }
    }
    public get nodes(): Array<LinkedListNode<T>> {
        let a: Array<LinkedListNode<T>> = [];

        if (this._count > 0) {
            let current: LinkedListNode<T> = this.head;
            while (current != null) {
                a.push(current);
                current = current.next;
            }
        }

        return a;
    }
    // public *nodes(): IterableIterator<LinkedListNode<T>> {
    //     let current: LinkedListNode<T> = this.head;
    //     while (current != null) {
    //         yield current;
    //         current = current.next;
    //     }
    // }
}