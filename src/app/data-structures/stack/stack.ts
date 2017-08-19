export interface IStack {
    items: Array<any>;
    size: number;
    push: (item: any) => void;
    pop: () => any;
    peek: () => any;
    clear: () => void;
}

export abstract class Stack<T> implements IStack {
    public abstract items: Array<T>;
    public abstract size: number;
    public abstract push(item: T): void;
    public abstract pop(): T;
    public abstract peek(): T;
    public abstract clear(): void;
}