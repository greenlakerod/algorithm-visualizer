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