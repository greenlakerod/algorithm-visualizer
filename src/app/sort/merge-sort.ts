import {ISortResult, Sorter} from "./sort";

export class MergeSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        this._sort(items, result);

        return result;
    }

    private _merge(items: Array<T>, left: Array<T>, right: Array<T>, result: ISortResult): void {
        let leftIndex = 0;
        let rightIndex = 0;
        let targetIndex = 0;

        let remaining = left.length + right.length;
        while (remaining > 0) {
            if (leftIndex >= left.length) {
                items[targetIndex] = right[rightIndex++];
            } else if (rightIndex >= right.length) {
                items[targetIndex] = left[leftIndex++];
            } else {
                if (left[leftIndex] < right[rightIndex]) {
                    items[targetIndex] = left[leftIndex++];
                } else {
                    items[targetIndex] = right[rightIndex++];
                }

                result.comparisons++;
            }

            result.swaps++;
            targetIndex++;
            remaining--;
        }
    }

    private _sort(items: Array<T>, result: ISortResult): void {
        if (items && items.length > 1) {
            let leftSize = items.length / 2;
            let rightSize = items.length - leftSize;

            let left: Array<T> = []; //new Array<T>(leftSize);
            let right: Array<T> = []; //new Array<T>(rightSize);

            this._copyArray(items, 0, leftSize, left);
            this._copyArray(items, leftSize, rightSize, right);

            this._sort(left, result); 
            this._sort(right, result);

            this._merge(items, left, right, result);     
        }
    }

    private _copyArray(items: Array<T>, start: number, end: number, subItems: Array<T>) {
        // for (let i = start; i < end; i++) {
        //     subItems.push(items[i]);
        // }
        subItems = items.slice(start, end - 1);
    }
}