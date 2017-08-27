import {ISortResult, Sorter} from "./sort";

export class MergeSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        this._sort(1, items, result);

        return result;
    }

    private _merge(iteration: number, items: Array<T>, left: Array<T>, right: Array<T>, result: ISortResult): void {
        console.log(`merge (${iteration}): items: ${items}, left: ${left}, right: ${right}`);

        let leftIndex = 0;
        let rightIndex = 0;
        let targetIndex = 0;

        let remaining = left.length + right.length;
        while (remaining > 0) {
            if (leftIndex >= left.length) {
                items[targetIndex++] = right[rightIndex++];
            } else if (rightIndex >= right.length) {
                items[targetIndex++] = left[leftIndex++];
            } else {
                if (left[leftIndex] < right[rightIndex]) {
                    items[targetIndex++] = left[leftIndex++];
                } else {
                    items[targetIndex++] = right[rightIndex++];
                }

                result.comparisons++;
            }

            result.swaps++;
            remaining--;
        }

        console.log(`merged (${iteration}): items: ${items}`);
    }

    private _sort(iteration: number, items: Array<T>, result: ISortResult): void {
        console.log(`sort (${iteration}): items: ${items}`);
        let leftSize: number = 0;
        let rightSize: number = 0;

        if (items && items.length > 1) {
            leftSize = Math.round(items.length / 2);
            rightSize = items.length - leftSize;
            console.log(`sort (${iteration}): leftSize: ${leftSize}, rightSize: ${rightSize}`);

            let left: Array<T> = []; //= new Array<T>(leftSize);
            let right: Array<T> = []; //= new Array<T>(rightSize); 

            this._copyArray(items, 0, leftSize, left);
            this._copyArray(items, leftSize, leftSize + rightSize, right);

            this._sort(iteration + 1, left, result);
            this._sort(iteration + 1, right, result);

            this._merge(iteration, items, left, right, result);
        } else {
            console.log(`sort (${iteration}): leftSize: ${leftSize}, rightSize: ${rightSize}`);
        }

        console.log(`sorted (${iteration}): items: ${items}`);
    }

    private _copyArray(items: Array<T>, start: number, end: number, subItems: Array<T>) {
        for (let i = start; i < end; i++) { // for (let i = start, j = 0; i < end; i++, j++) {
            subItems.push(items[i]); // subItems[j] = items[i];
        }
    }
}