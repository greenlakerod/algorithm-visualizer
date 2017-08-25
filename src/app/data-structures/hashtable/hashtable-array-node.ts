import {HashTableNodePair} from "./hashtable-node-pair";
import {LinkedList} from "../linked-list/linked-list";
import {LinkedListNode} from "../linked-list/linked-list-node";

export interface IHashTableArrayNode {
    keys: Array<any>;
    values: Array<any>;
    items: Array<any>;
    add: (key: any, value: any) => void;
    update: (key: any, value: any) => void;
    tryGetValue: (key: any, value: { value?: any }) => boolean;
    remove: (key: any) => boolean;
    clear: () => void;
}

export class HashTableArrayNode<TKey, TValue> implements IHashTableArrayNode {
    private _items: LinkedList<HashTableNodePair<TKey, TValue>>;

    public get keys(): Array<TKey> {
        let keys: Array<TKey> = [];
        if (this._items) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                keys.push(node.value.key);
                node = node.next;
            }
        }

        return keys; 
    }
    public get values(): Array<TValue> {
        let values: Array<TValue> = [];
        if (this._items) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                values.push(node.value.value);
                node = node.next;
            }
        }

        return values; 
    }
    public get items(): Array<HashTableNodePair<TKey, TValue>> { 
        let items: Array<HashTableNodePair<TKey, TValue>> = [];
        if (this._items) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                items.push(node.value);
                node = node.next;
            }
        }

        return items; 
    }

    public add(key: TKey, value: TValue) {
        if (!this._items) {
            this._items = new LinkedList<HashTableNodePair<TKey, TValue>>();
        }

        let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
        while (node) {
            if (node.value.key === key) {
                throw ("The collection already contains the key");
            }
            node = node.next;
        }

        let item: HashTableNodePair<TKey, TValue> = new HashTableNodePair<TKey, TValue>(key, value);
        this._items.addFirst(item);
    }
    public update(key: TKey, value: TValue) {
        let updated: boolean = false;

        if (this._items) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                if (node.value.key === key) {
                    node.value.value = value;
                    break;
                }
                node = node.next;
            }
        }

        if (!updated) {
            throw "The collection does not contain the key";
        }
    }
    public tryGetValue(key: TKey, value: { value?: TValue }): boolean { 
        let found: boolean = false;

        if (this._items != null) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                if (node.value.key === key) {
                    value.value = node.value.value;
                    found = true;
                    break;
                }
                node = node.next;
            }
        }

        return found; 
    }
    public remove(key: TKey): boolean {
        let removed: boolean = false; 

        if (this._items != null) {
            let node: LinkedListNode<HashTableNodePair<TKey, TValue>> = this._items.head;
            while (node) {
                if (node.value.key === key) {
                    removed = this._items.remove(node.value);
                    break;
                }
                node = node.next;
            }
        }

        return removed; 
    }
    public clear(): void {
        if (this._items) {
            this._items.clear();
        }
    }
}