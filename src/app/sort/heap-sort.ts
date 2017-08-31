import {ISortResult, Sorter} from "./sort";

export class HeapSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        this._sort(items, items.length, result);

        return result;
    }

    // create a max heap (the value of each node is greater than the value of its left and right children)
    private _maxHeapify(items: Array<T>, length: number, index: number, result: ISortResult): void {

        //model it after a binary tree node
        let rootIndex: number = index;
        let leftIndex: number = (2 * index) + 1;
        let rightIndex: number = (2 * index) + 2;

        //set the new "root"
        if (leftIndex < length && items[leftIndex] > items[rootIndex]) {
            rootIndex = leftIndex;
        }
        result.comparisons++;

        if (rightIndex < length && items[rightIndex] > items[rootIndex]) {
            rootIndex = rightIndex;
        }
        result.comparisons++;

        if (rootIndex != index) {
            this._swap(items, index, rootIndex);
            result.swaps++;

            this._maxHeapify(items, length, rootIndex, result);
        }
    }

    private _sort(items: Array<T>, length: number, result: ISortResult): void {

        // Build heap (rearrange array)
        // start with the left half the array
        // this moves larger values to the right, if necessary
        let maxIndex: number = Math.round(length / 2) - 1;
        for (let i = maxIndex; i >= 0; i--) {
            this._maxHeapify(items, length, i, result);
        }

        // One by one extract an element from heap
        // now do the entire array
        for (let i = length - 1; i >= 0; i--) {

            // Move current root to end
            this._swap(items, 0, i);
            result.swaps++;

            // call max heapify on the reduced heap
            this._maxHeapify(items, i, 0, result);
        }
    }
}