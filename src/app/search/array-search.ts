import {ISearchResult, SearchAlgorithm} from "./search";

export class SequentialSearch<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            for (let i = 0; i < toSearch.length; i++) {
                this._comparisons++;

                if (toSearch[i] === toFind) {
                    yield <ISearchResult>{ startIndex: i };
                }
            }
        }
    }
}

export class BinarySearch<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            let left = 0;
            let right = toSearch.length - 1;

            while (left <= right) {
                this._comparisons++;

                let mid = left + ((right - left) / 2);
                if (toSearch[mid] > toFind) {
                    right = mid - 1;
                } else if (toSearch[mid] < toFind) {
                    left = mid + 1;
                } else {
                    yield { startIndex: mid };
                }
            }
        }
    }
}

export class BinarySearchRecursive<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;
        let result = this._binarySearch(toFind, toSearch, 0, toSearch.length - 1);

        if (result) {
            yield result;
        }
    }

    private _binarySearch(toFind: T, toSearch: Array<T>, left: number, right: number): ISearchResult {
        if (left <= right) {
            this._comparisons++;

            let mid = left + ((right - left) / 2);
            if (toSearch[mid] > toFind) {
                return this._binarySearch(toFind, toSearch, left, mid - 1);
            } else if (toSearch[mid] < toFind) {
                return this._binarySearch(toFind, toSearch, mid + 1, right);
            } else {
                return <ISearchResult>{ startIndex: mid };
            }
        }

        return null;
    }
}