import {HeapType, Heap} from "./heap";
import {ISortResult} from "../../sort/sort";

//min heap: http://www.geeksforgeeks.org/binary-heap/
//max heap: https://gist.github.com/aatishnn/8265656#file-binarymaxheap-c-L58
export class ArrayHeap extends Heap {
    private _items: Array<number>;

    constructor(heapType: HeapType, capacity: number) {
        super(heapType, capacity);

        this._items = new Array<number>(capacity);
    }

    public getItems(): Array<number> {
        return this._items;
    }

    public insertKey(value: number) {
        if (this._items.length === this._capacity) {
            throw "Overflow: Could not insert key";
        } //todo grow the array to twice the size

        let index = this._items.length - 1;
        let parentIndex: number = this._getParentIndex(index);

        if (this._heapType == HeapType.MaxHeap) {
            while (index != 0 && (this._items[parentIndex] >= value)) {
                this._items[index] = this._items[parentIndex];
                index = parentIndex;
                parentIndex = this._getParentIndex(index);
            }
    
            this._items[index] = value;
        } else {
            this._items[index] = value;

            while (index != 0 && this._items[parentIndex] > this._items[index]) {
                this._swap(index, parentIndex);
                index = parentIndex;
                parentIndex = this._getParentIndex(index);
            }
        }
    }

    public heapify(index: number, length: number, items: Array<number> = this._items, sortResult?: ISortResult): void {
        let rootIndex = index;
        let leftIndex = this._getLeftChildIndex(index);
        let rightIndex = this._getRightChildIndex(index);

        if (leftIndex < length) {
            if (this._heapType == HeapType.MaxHeap) {
                if (items[leftIndex] > items[rootIndex]) {
                    rootIndex = leftIndex;
                }
            } else if (items[leftIndex] < items[rootIndex]) {
                rootIndex = leftIndex;
            }
            if (sortResult) {
                sortResult.comparisons++;
            }
        }

        if (rightIndex < length) {
            if (this._heapType == HeapType.MaxHeap) {
                if (items[rightIndex] > items[rootIndex]) {
                    rootIndex = rightIndex;
                }
            } else if (items[rightIndex] < items[rootIndex]) {
                rootIndex = leftIndex;
            }
            if (sortResult) {
                sortResult.comparisons++;
            }
        }

        if (rootIndex != index) {
            this._swap(rootIndex, index);
            if (sortResult) {
                sortResult.swaps++;
            }

            this.heapify(rootIndex, length, items, sortResult);
        }
    }

    private _swap(l: number, r: number) {
        let temp = this._items[l];
        this._items[l] = this._items[r];
        this._items[r] = temp;
    }
    private _getParentIndex(i: number): number {
        return (i - 1) / 2;
    }
    private _getLeftChildIndex(i: number): number {
        return ((2 * i) + 1);
    }
    private _getRightChildIndex(i: number): number {
        return ((2 * i) + 2);
    }
}