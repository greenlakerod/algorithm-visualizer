import {ISortResult, Sorter} from "./sort";

export class QuickSort<T> extends Sorter<T> {
    
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };
        
        if (items && items.length > 1) {
            this._sort(1, items, 0, items.length - 1, result);
        }

        return result;
    }

    private _sort(iteration: number, items: Array<T>, start: number, end: number, result: ISortResult): void {
        console.log(`sort (${iteration}): start: ${start}, end: ${end}, items: ${items}`);

        if (start < end) {
            let currentPivotIndex = this._setPivot(start, end);

            this._swap(items, start, currentPivotIndex);
            result.swaps++;

            let key = items[start];
            let i = start + 1;
            let j = end;
            while (i <= j) {
                while ((i <= end) && (items[i] <= key)) {
                    result.comparisons++;
                    i++;
                }
                while ((j >= start) && (items[j] > key)) {
                    result.comparisons++;
                    j--;
                }

                if (i < j) {
                    this._swap(items, i, j);
                    result.swaps++;
                }
            }

            this._swap(items, start, j);
            result.swaps++;

            this._sort(iteration + 1, items, start, j - 1, result);
            this._sort(iteration + 1, items, j + 1, end, result);
        }

        console.log(`sorted (${iteration}): items: ${items}`);
    }

    private _setPivot(start: number, end: number): number {
        return (Math.round((start + end) / 2)); //return return Math.floor((Math.random() * end) + start);
    }
}