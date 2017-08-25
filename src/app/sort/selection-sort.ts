import {ISortResult, Sorter} from "./sort";

export class SelectionSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        if (items && items.length > 1) {
            let sortedRangeEnd: number = 0;
            while (sortedRangeEnd < items.length) {
                let nextIndex = this._findIndexOfSmallest(items, sortedRangeEnd, result);
                this._swap(items, sortedRangeEnd, nextIndex);
    
                result.swaps++;
                sortedRangeEnd++;
            }
        }

        return result;
    }

    private _findIndexOfSmallest(items: Array<T>, sortedRangeEnd: number, result: ISortResult): number {
        let min = items[sortedRangeEnd];
        let index = sortedRangeEnd;

        for (let i = sortedRangeEnd + 1; i < items.length; i++) {
            if (items[i] < min) {
                min = items[i];
                index = i;
            }

            result.comparisons++;
        }

        return index;
    }
}