import {ISortResult, Sorter} from "./sort";

export class InsertionSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        if (items && items.length > 1) {
            let sortedRangeEndIndex = 1;

            while (sortedRangeEndIndex < items.length) {
                result.comparisons++;
                if (items[sortedRangeEndIndex] < items[sortedRangeEndIndex - 1]) {
                    let insertAtIndex = this._findInsertionIndex(items, items[sortedRangeEndIndex], result);
                    this._insert(items, insertAtIndex, sortedRangeEndIndex, result);
                }

                sortedRangeEndIndex++;
            }
        }

        return result;
    }

    private _findInsertionIndex(items: Array<T>, value: T, result: ISortResult): number {
        for (let i = 0; i < items.length; i++) {
            result.comparisons++;

            if (items[i] > value) {
                return i;
            }
        }

        throw `The insertion index for '${value}' was not found`;
    }
    private _insert(items: Array<T>, indexTo: number, indexFrom: number, result: ISortResult): void {
        let temp: T = items[indexTo];

        items[indexTo] = items[indexFrom];

        for (let i = indexFrom; i > indexTo; i--) {
            items[i] = items[i - 1];
            result.swaps++;
        }

        items[indexTo + 1] = temp;
        result.swaps++;
    }    
}