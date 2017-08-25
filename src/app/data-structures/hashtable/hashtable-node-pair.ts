export interface IHashTableNodePair {
    key: any;
    value: any;
}

export class HashTableNodePair<TKey, TValue> implements IHashTableNodePair {
    constructor(public key: TKey, public value: TValue) {}
}