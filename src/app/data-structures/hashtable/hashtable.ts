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

    /**
     * Adds the key/value pair to the hash table.  If the key already exists in the
     * hash table an ArgumentException will be thrown
     * @param key
     * @param value
     */
    public add(key: TKey, value: TValue): void {
        // if we are at capacity, the array needs to grow
        if (this._count >= this._maxItemsAtCurrentSize) {
            //allocate a new array
            let larger: HashTableArray<TKey, TValue> = new HashTableArray<TKey, TValue>(this._array.capacity * 2);

            //re-add each item
            this._array.items.forEach((item) => {
                larger.add(item.key, item.value);
            });

            //the larger array is now the storage
            this._array = larger;

            //update the max size
            this._maxItemsAtCurrentSize = (this._array.capacity * HashTable.fillFactor) + 1;
        }
            
        this._array.add(key, value);
        this._count++;
    }

    public remove(key: TKey): boolean {
        let removed = this._array.remove(key);
        if (removed) {
            this._count--;
        }

        return removed;
    }

    public getItem(key: TKey): TValue {
        let value: { value?: TValue };
        if (!this._array.tryGetValue(key, value)) {
            throw "key does not exist";
        }

        return value.value;
    }

    public setItem(key: TKey, value: TValue): void {
        this._array.update(key, value);
    }
}