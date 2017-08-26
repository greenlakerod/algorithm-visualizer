import {Component, OnInit} from "@angular/core";
import {SequentialSearch, BinarySearch, BinarySearchRecursive} from "./array-search";
import {ISearchResult, ISearchAlgorithm} from "./search";

@Component({
    selector: "array-search",
    templateUrl: "./array-search.component.html",
    styleUrls: ["../../data-structures/data-structure.css", "../../data-structures/queue/queue.component.css", "./array-search.component.css"]
})
export class ArraySearchComponent implements OnInit {
    private _dataType: string = "number";
    public get dataType(): string { return this._dataType; }

    private _searchType: string = "sequential";
    public get searchType(): string { return this._searchType; }

    private _algorithm: ISearchAlgorithm;
    private _searchResults: Array<ISearchResult>;
    public get searchResults(): Array<ISearchResult> { return this._searchResults; }

    public get comparisons(): number { return this._algorithm.comparisons; }

    private _items: Array<any>;
    public get items(): Array<any> { return this._items; }

    public ngOnInit(): void {
        //this.setType();
        this._algorithm = new SequentialSearch<number>();
    }

    public generate(count: string | number, sorted: boolean = true): void { 
        this._items = null;
        this._searchResults = null;

        let ct: number = parseInt(count.toString());
        let array: Array<number> = new Array<number>(ct);
        
        for (let i = 0; i < ct; i++) {
            array[i] = i;
        }

        if (!sorted) {
            let tmp, current, top = array.length;
            if (top) {
                while (--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }
            }
        }


        //this.setType(ct);
        this._items = array;
    }
    public onAlgorithmTypeChange(type: string): void {
        this._searchType = type;
        this._searchResults = null;

        if (type == "sequential") {
            this._algorithm = new SequentialSearch<number>();
        } else if (type == "binary") {
            this._algorithm = new BinarySearch<number>();
        } else {
            this._algorithm = new BinarySearchRecursive<number>();
        }
    }

    public onDataTypeChange(type: string): void {}

    public search(value: string | number): void {
        this._searchResults = [];
        let val = parseInt(value.toString());
        let results = this._algorithm.search(val, this._items);

        let done = false;
        while (!done) {
            let result = (<any>results).next();
            if (result.value !== undefined && !result.done) {
                this._searchResults.push(<ISearchResult>result);
            } else {
                done = true;
            }
        }

        console.log("comparisons: " + this._algorithm.comparisons);
    }

    private setType(count?: number): void {
        if (this._items) {
            this._items = this._items.splice(0);
        }

        switch (this._dataType) {
            case "number":
                this._items = new Array<number>(count);
                break;
            default:
                break;
        }
    }
}