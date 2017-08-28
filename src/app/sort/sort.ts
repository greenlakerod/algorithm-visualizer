//https://www.cs.cmu.edu/~adamchik/15-121/lectures/Sorting%20Algorithms/sorting.html
//https://www.toptal.com/developers/sorting-algorithms

export interface ISortResult {
    comparisons: number;
    swaps: number;
}

export interface ISortAlgorithm {
    sort(items: Array<any>): ISortResult;
}

export abstract class Sorter<T> implements ISortAlgorithm {
    protected _swap(items: Array<T>, left: number, right: number): void {
        let temp: T = items[left];
        items[left] = items[right];
        items[right] = temp;
    }

    public abstract sort(items: Array<T>): ISortResult;
}