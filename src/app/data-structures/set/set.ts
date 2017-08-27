import {LinkedList} from "../linked-list/linked-list";

export interface ISet {
    count: number;
    items: Array<any>;
    add: (item: any) => void;
    addRange: (items: Array<any>) => void;
    contains: (item: any) => boolean;
    remove: (item: any) => boolean;
    union: (other: ISet) => ISet;
    intersection: (other: ISet) => ISet;
    difference: (other: ISet) => ISet;
    symmetricDifference: (other: ISet) => ISet;
}

export class Set<T> implements ISet {
    private _items: LinkedList<T>;
    public get items(): Array<T> {
        let array: Array<T> = new Array<T>(this._items.count);
        this._items.copyTo(array);

        return array;
    }

    public get count(): number { return this._items.count; }

    constructor(items?: Array<T>) {
        this._items = new LinkedList<T>();

        if (items) {
            this.addRange(items);
        }
    }

    public add(item: T): void {
        if (this.contains(item)) {
            throw "Item already exists in the set";
        }

        this._items.addLast(item);
    }
    public addRange(items: Array<T>): void {
        items.forEach((item) => {
            this.add(item);
        });
    }
    public contains(item: any): boolean { return this._items.contains(item); }
    public remove(item: any): boolean {
        return this._items.remove(item);
    }
    public union(other: Set<T>): Set<T> {
        let result: Set<T> = new Set<T>(this.items);

        other.items.forEach((item) => {
            if (!result.contains(item)) {
                result.items.push(item);
            }
        });

        return result;
    }
    public intersection(other: Set<T>): Set<T> {
        let result: Set<T> = new Set<T>();

        this.items.forEach((item) => {
            if (other.contains(item)) {
                result.add(item);
            }
        });

        return result;
    }
    public difference(other: Set<T>): Set<T> {
        let result: Set<T> = new Set<T>(this.items);

        other.items.forEach((item) => {
            result.remove(item);
        });

        return result;
    }
    public symmetricDifference(other: Set<T>): Set<T> {
        let intersection: Set<T> = this.intersection(other);
        let union: Set<T> = this.union(other);

        return union.difference(intersection);
    }
}