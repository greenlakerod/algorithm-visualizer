import {ISortResult, Sorter} from "./sort";

export class SelectionSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        if (items && items.length > 1) {
            let sortedRangeStart: number = 0;
            while (sortedRangeStart < items.length) {
                let nextIndex = this._findIndexOfSmallest(items, sortedRangeStart, result);
                this._swap(items, sortedRangeStart, nextIndex);
    
                result.swaps++;
                sortedRangeStart++;
            }
        }

        return result;
    }

    private _findIndexOfSmallest(items: Array<T>, sortedRangeStart: number, result: ISortResult): number {
        let min = items[sortedRangeStart];
        let index = sortedRangeStart;

        for (let i = sortedRangeStart + 1; i < items.length; i++) {
            if (items[i] < min) {
                min = items[i];
                index = i;
            }

            result.comparisons++;
        }

        return index;
    }
}