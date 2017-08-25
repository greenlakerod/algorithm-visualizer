import {ISearchResult, ISearchAlgorithm} from "./search";

export class SequentialSearch implements ISearchAlgorithm {
    public search(toFind: number, toSearch: Array<number>): ISearchResult {
        let result: ISearchResult = { found: false, comparisons: 0, startIndex: -1 };

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            for (let i = 0; i < toSearch.length; i++) {
                result.comparisons++;

                if (toSearch[i] === toFind) {
                    result.found = true;
                    result.startIndex = i;
                    break;
                }
            }
        }

        return result;
    }
}

export class BinarySearch implements ISearchAlgorithm {
    public search(toFind: number, toSearch: Array<number>): ISearchResult {
        let result: ISearchResult = { found: false, comparisons: 0, startIndex: -1 };

        if (toSearch && toSearch.length > 0 && toFind != null && toFind != undefined) {
            let left = 0;
            let right = toSearch.length - 1;

            while (left <= right) {
                result.comparisons++;

                let mid = left + ((right - left) / 2);
                if (toSearch[mid] > toFind) {
                    right = mid - 1;
                } else if (toSearch[mid] < toFind) {
                    left = mid + 1;
                } else {
                    result.found = true;
                    result.startIndex = mid;
                    break;
                }
            }
        }

        return result;
    }
}

export class BinarySearchRecursive implements ISearchAlgorithm {
    public search(toFind: number, toSearch: Array<number>): ISearchResult {
        let result: ISearchResult = { found: false, comparisons: 0, startIndex: -1 };

        this._binarySearch(toFind, toSearch, 0, toSearch.length - 1, result);

        return result;
    }

    private _binarySearch(toFind: number, toSearch: Array<number>, left: number, right: number, result: ISearchResult): void {
        if (left <= right) {
            result.comparisons++;

            let mid = left + ((right - left) / 2);
            if (toSearch[mid] > toFind) {
                this._binarySearch(toFind, toSearch, left, mid - 1, result);
            } else if (toSearch[mid] < toFind) {
                this._binarySearch(toFind, toSearch, mid + 1, right, result);
            } else {
                result.found = true;
                result.startIndex = mid;
            }
        }
    }
}