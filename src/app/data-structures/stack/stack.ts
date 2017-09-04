export interface IStack {
    items: Array<any>;
    slots: Array<boolean>;
    size: number;
    push: (item: any) => void;
    pop: () => any;
    peek: () => any;
    clear: () => void;
    empty: () => boolean;
}

export abstract class Stack<T> implements IStack {
    public abstract items: Array<T>;
    public abstract slots: Array<boolean>;
    public abstract size: number;
    public abstract push(item: T): void;
    public abstract pop(): T;
    public abstract peek(): T;
    public abstract clear(): void;

    public empty(): boolean {
        return this.size === 0;
    }
}