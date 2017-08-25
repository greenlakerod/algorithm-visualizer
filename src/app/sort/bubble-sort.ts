import {ISortResult, Sorter} from "./sort";

export class BubbleSort<T> extends Sorter<T> {
    public sort(items: Array<T>): ISortResult {
        let result: ISortResult = <ISortResult>{ comparisons: 0, swaps: 0 };

        if (items && items.length > 1) {
            let swapped: boolean = false;
            do {
                swapped = false;
                for (let i = 1; i < items.length; i++) {
                    result.comparisons++;
    
                    if (items[i - 1] > items[i]) {
                        this._swap(items, i - 1, i);
                        swapped = true;
                        result.swaps++;
                    }
                }
            } while (swapped);
        }

        return result;
    }
}