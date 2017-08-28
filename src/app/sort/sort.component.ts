import {Component, OnInit} from "@angular/core";
import {ISortResult, ISortAlgorithm} from "./sort";
import {SortAlgorithmFactory} from "./sort-algorithm.factory";

@Component({
    selector: "sort",
    templateUrl: "./sort.component.html",
    styleUrls: ["../../data-structures/data-structure.css", "../../data-structures/queue/queue.component.css", "./sort.component.css"]
})
export class SortComponent implements OnInit {
    private _dataType: string = "number";
    public get dataType(): string { return this._dataType; }

    private _sortType: string;
    public get sortType(): string { return this._sortType; }

    private _unsortedItems: Array<any>;
    public get unsortedItems(): Array<any> { return this._unsortedItems; }

    private _sortedItems: Array<any>;
    public get sortedItems(): Array<any> { return this._sortedItems; }

    private _sortResult: ISortResult;
    public get sortResult(): ISortResult { return this._sortResult; }

    private _algorithm: ISortAlgorithm;
    public get algorithmOptions(): Array<{ name: string; label: string; }> {
        return SortAlgorithmFactory.options;
    }

    public ngOnInit(): void {
        SortAlgorithmFactory.initialize();
        this._sortType = SortAlgorithmFactory.options[0].name;
        this._algorithm = SortAlgorithmFactory[this._sortType];
    }

    public generate(count: string | number, sorted: boolean = false): void {
        this._unsortedItems = null;
        this._sortedItems = null;
        this._sortResult = null;

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
        this._unsortedItems = array;
    }

    public sort(): void {
        this._sortResult = null;

        let temp: Array<any> = [];
        temp = temp.concat(this._unsortedItems);

        this._sortResult = this._algorithm.sort(temp);
        this._sortedItems = temp;
    }

    public onAlgorithmTypeChange(type: string): void {
        this._sortType = type;
        this._sortedItems = null;
        this._sortResult = null;
        this._algorithm = SortAlgorithmFactory[type];
    }

    public onDataTypeChange(type: string): void { }

    private setType(count?: number): void {
        this._unsortedItems = null;
        this._sortedItems = null;
        this._sortResult = null;

        switch (this._dataType) {
            case "number":
                this._unsortedItems = new Array<number>(count);
                break;
            default:
                break;
        }
    }
}