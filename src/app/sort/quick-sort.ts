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
            //let the pivot be the value in the middle of the range
            //it may not be the actual middle value
            let currentPivotIndex = this._setPivot(start, end);

            //put the pivot value in the first index so it's not in the
            //"sorting" range
            this._swap(items, start, currentPivotIndex);
            result.swaps++;

            //the sorting range starts immediately after the index where the pivot
            //value is located
            let key = items[start];
            let i = start + 1;
            let j = end;
            while (i <= j) {
                //disregard any values less than or equal to the pivot.
                //they need to stay to the left
                while ((i <= end) && (items[i] <= key)) {
                    result.comparisons++;
                    i++;
                }

                //disregard any values greater than the pivot
                //they need to stay to the right
                while ((j >= start) && (items[j] > key)) {
                    result.comparisons++;
                    j--;
                }

                //only swap if the start/end points overlap
                if (i < j) {
                    this._swap(items, i, j);
                    result.swaps++;
                }
            }

            //move the pivot value back to the "center"
            this._swap(items, start, j);
            result.swaps++;

            //divide the array into two then repeat
            this._sort(iteration + 1, items, start, j - 1, result);
            this._sort(iteration + 1, items, j + 1, end, result);
        }

        console.log(`sorted (${iteration}): items: ${items}`);
    }

    private _setPivot(start: number, end: number): number {
        return (Math.round((start + end) / 2)); //return return Math.floor((Math.random() * end) + start);
    }
}