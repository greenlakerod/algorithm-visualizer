import {ISearchResult, SearchAlgorithm} from "./search";

export class SequentialSearch<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            for (let i = 0; i < toSearch.length; i++) {
                this._comparisons++;

                if (toSearch[i] === toFind) {
                    yield <ISearchResult>{ startIndex: i };
                    break;
                }
            }
        }
    }
}

export class BinarySearch<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;
        let resultIndex: number = -1;

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            let left = 0;
            let right = toSearch.length - 1;
            
            while (left <= right) {
                let mid = Math.round(left + ((right - left) / 2)); 
                console.log("mid: " + mid);

                this._comparisons++;

                if (toSearch[mid] > toFind) {
                    right = mid - 1;
                } else if (toSearch[mid] < toFind) { 
                    left = mid + 1;
                } else {
                    resultIndex = mid;
                    break;
                }
            }
        }

        yield <ISearchResult>{ startIndex: resultIndex };
    }
}

export class BinarySearchRecursive<T> extends SearchAlgorithm<T> {
    public *search(toFind: T, toSearch: Array<T>): Iterable<ISearchResult> {
        this._comparisons = 0;
        let resultIndex = this._binarySearch(toFind, toSearch, 0, toSearch.length - 1);

        yield <ISearchResult>{ startIndex: resultIndex };
    }

    private _binarySearch(toFind: T, toSearch: Array<T>, left: number, right: number): number {
        if (left <= right) {
            this._comparisons++;

            let mid = Math.round(left + ((right - left) / 2)); 
            if (toSearch[mid] > toFind) {
                return this._binarySearch(toFind, toSearch, left, mid - 1);
            } else if (toSearch[mid] < toFind) {
                return this._binarySearch(toFind, toSearch, mid + 1, right);
            } else {
                return mid;
            }
        }

        return -1;
    }
}