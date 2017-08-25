import {ISortResult, Sorter} from "./sort";

export class QuickSort<T> extends Sorter<T> {
    
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };
        
        if (items && items.length > 1) {
            this._sort(items, 0, items.length - 1, result);
        }

        return result;
    }

    private _sort(items: Array<T>, start: number, end: number, result: ISortResult): void {
        if (start < end) {
            let currentPivotIndex = this._getRandomInRange(start, end);
            let newPivotIndex = this._partition(items, start, end, currentPivotIndex, result);

            this._sort(items, start, newPivotIndex - 1, result);
            this._sort(items, newPivotIndex + 1, end, result);
        }
    }

    private _getRandomInRange(start: number, end: number): number {
        return Math.floor((Math.random() * end) + start);
    }

    private _partition(items: Array<T>, start: number, end: number, pivotIndex: number, result: ISortResult): number {
        let pivotValue: T = items[pivotIndex];

        this._swap(items, pivotIndex, end);
        result.swaps++;

        let currentIndex = start;
        for (let i = start; i < end; i++) {
            if (items[i] < pivotValue) {
                this._swap(items, i, currentIndex++);
                result.swaps++;
            }

            result.comparisons++;
        }

        this._swap(items, currentIndex, end);
        result.swaps++;

        return currentIndex;
    }
}