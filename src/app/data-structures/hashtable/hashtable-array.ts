import {HashTableArrayNode} from "./hashtable-array-node";
import {HashTableNodePair} from "./hashtable-node-pair";
const hash = require("object-hash");

export interface IHashTableArray {

}

export class HashTableArray<TKey, TValue> implements IHashTableArray {
    private _array: Array<HashTableArrayNode<TKey, TValue>>;

    public get keys(): Array<TKey> {
        let keys: Array<TKey> = [];
        this._array.forEach((node) => {
            keys = keys.concat(node.keys);
        });

        return keys;
    }
    public get values(): Array<TValue> {
        let values: Array<TValue> = [];
        this._array.forEach((node) => {
            values = values.concat(node.values);
        });

        return values;
    }
    public get items(): Array<HashTableNodePair<TKey, TValue>> {
        let items: Array<HashTableNodePair<TKey, TValue>> = [];
        this._array.forEach((node) => {
            items = items.concat(node.items);
        });

        return items;
    }
    public get capacity(): number {
        return this._array.length;
    }

    constructor(capacity: number) {
        this._array = new Array<HashTableArrayNode<TKey, TValue>>(capacity).fill(new HashTableArrayNode<TKey, TValue>());
    }

    public add(key: TKey, value: TValue): void {
        this._array[this.getIndex(key)].add(key, value);
    }
    public update(key: TKey, value: TValue): void {
        this._array[this.getIndex(key)].update(key, value);
    }
    public remove(key: TKey): boolean {
        return this._array[this.getIndex(key)].remove(key);
    }
    public clear(): void {
        this._array.forEach((node) => {
            node.clear();
        });
    }

    private getIndex(key: TKey): number {
        return Math.abs(hash(key) % this.capacity);
    }
}