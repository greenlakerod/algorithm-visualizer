import {HashTableArray} from "./hashtable-array";

export class HashTable<TKey, TValue> {
    // If the array exceeds this fill percentage it will grow
    // In this example the fill factor is the total number of items
    // regardless of whether they are collisions or not.
    static fillFactor: number = 0.75;

    // the maximum number of items to store before growing.
    // This is just a cached value of the fill factor calculation
    private _maxItemsAtCurrentSize: number;

    // the number of items in the hash table
    private _count: number;

    // The array where the items are stored.
    private _array: HashTableArray<TKey, TValue>;

    constructor(initialCapacity: number = 1000) {
        this._array = new HashTableArray<TKey, TValue>(initialCapacity);

        // when the count exceeds this value, the next Add will cause the
        // array to grow
        this._maxItemsAtCurrentSize = (initialCapacity * HashTable.fillFactor) + 1;
    }
}