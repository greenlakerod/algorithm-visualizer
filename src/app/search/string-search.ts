import {ISearchResult, SearchAlgorithm} from "./search";

export class NaiveStringSearch extends SearchAlgorithm<string> {
    public *search(toFind: string, toSearch: string): Iterable<ISearchResult> {
        this._comparisons = 0;
        
        if (toSearch && toFind && toSearch.length > 0 && toFind.length > 0 && toSearch.length >= toFind.length) {
            for (let startIndex = 0; startIndex < (toSearch.length - toFind.length); startIndex++) {
                let matchCount = 0;
                while (toSearch[startIndex + matchCount].toLowerCase() === toFind[matchCount].toLowerCase()) {
                    matchCount++;
                    this._comparisons++;

                    if (toFind.length === matchCount) {
                        yield <ISearchResult>{ startIndex: startIndex };
                    }
                }

                if (matchCount == 0) {
                    this._comparisons++;
                }
            }
        }
    }
}

export class BoyerMooreHorspoolStringSearch extends SearchAlgorithm<string> {
    private _buildBadMatchShiftTable(toFind: string): { [char: string]: number } {
        let shiftDistances = {};
        for (let i = 0; i < toFind.length; i++) {
            shiftDistances[toFind[i]] = toFind.length - i - 1;
        }

        return shiftDistances;
    }

    public *search(toFind: string, toSearch: string): Iterable<ISearchResult> {
        this._comparisons = 0;
        
        if (toSearch && toFind && toSearch.length > 0 && toFind.length > 0 && toSearch.length >= toFind.length) {
            let badMatchShiftTable = this._buildBadMatchShiftTable(toFind);
            let startIndex = 0;

            while (startIndex <= toSearch.length - toFind.length) {
                let remaining = toFind.length;
                while (remaining >= 0 && toSearch[remaining].toLowerCase() === toFind[startIndex + remaining].toLowerCase()) {
                    remaining--;
                    this._comparisons++;
                }

                if (remaining === toFind.length) {
                    this._comparisons++;
                }
                if (remaining < 0) {
                    yield <ISearchResult>{ startIndex: startIndex };
                } else {
                    startIndex += badMatchShiftTable[toSearch[startIndex + toFind.length - 1]];
                }
            }
        }
    }
}