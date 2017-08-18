export class LinkedListNode<T> {
    public value: T;
    public next: LinkedListNode<T>;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}