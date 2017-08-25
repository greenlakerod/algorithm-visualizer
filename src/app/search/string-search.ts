import {ISearchResult, ISearchAlgorithm} from "./search";

export class NaiveStringSearch implements ISearchAlgorithm {
    public search(toFind: string, toSearch: string): ISearchResult {
        let result: ISearchResult = { found: false, comparisons: 0, startIndex: -1 };
        
        if (toSearch && toFind && toSearch.length > 0 && toFind.length > 0 && toSearch.length >= toFind.length) {
            for (let startIndex = 0; startIndex < (toSearch.length - toFind.length); startIndex++) {
                let matchCount = 0;
                while (toSearch[startIndex + matchCount].toLowerCase() === toFind[matchCount].toLowerCase()) {
                    matchCount++;
                    result.comparisons++;

                    if (toFind.length === matchCount) {
                        result.found = true;
                        result.startIndex = startIndex;
                        break;
                    }
                }

                if (result.found) {
                    break;
                }

                if (matchCount == 0) {
                    result.comparisons++;
                }
            }
        }

        return result;
    }
}

export class BoyerMooreHorspoolStringSearch implements ISearchAlgorithm {
    private _buildBadMatchShiftTable(toFind: string): { [char: string]: number } {
        let shiftDistances = {};
        for (let i = 0; i < toFind.length; i++) {
            shiftDistances[toFind[i]] = toFind.length - i - 1;
        }

        return shiftDistances;
    }

    public search(toFind: string, toSearch: string): ISearchResult {
        let result: ISearchResult = { found: false, comparisons: 0, startIndex: -1 };
        
        if (toSearch && toFind && toSearch.length > 0 && toFind.length > 0 && toSearch.length >= toFind.length) {
            let badMatchShiftTable = this._buildBadMatchShiftTable(toFind);
            let startIndex = 0;

            while (startIndex <= toSearch.length - toFind.length) {
                let remaining = toFind.length;
                while (remaining >= 0 && toSearch[remaining].toLowerCase() === toFind[startIndex + remaining].toLowerCase()) {
                    remaining--;
                    result.comparisons++;
                }

                if (remaining === toFind.length) {
                    result.comparisons++;
                }
                if (remaining < 0) {
                    result.found = true;
                    result.startIndex = startIndex;
                    break;
                } else {
                    startIndex += badMatchShiftTable[toSearch[startIndex + toFind.length - 1]];
                }
            }
        }

        return result;
    }
}