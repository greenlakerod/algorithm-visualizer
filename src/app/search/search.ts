//http://www.geeksforgeeks.org/searching-algorithms/

export interface ISearchResult {
    startIndex: number;
}

export interface ISearchAlgorithm {
    comparisons: number;
    search(toFind: any, toSearch: any | Array<any> ): Iterable<ISearchResult>;
}

export abstract class SearchAlgorithm<T> implements ISearchAlgorithm {
    protected _comparisons: number;
    public get comparisons(): number { return this._comparisons; }

    public abstract search(toFind: T, toSearch: T | Array<T>): Iterable<ISearchResult>;
}