export interface ISearchResult {
    found: boolean;
    comparisons: number;
    startIndex?: number;
}

export interface ISearchAlgorithm {
    search(toFind: any, toSearch: any): ISearchResult;
}