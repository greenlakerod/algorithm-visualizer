import {Component, OnInit} from "@angular/core";
import {ISortResult, ISortAlgorithm} from "./sort";
import {BubbleSort} from "./bubble-sort";
import {InsertionSort} from "./insertion-sort";
import {MergeSort} from "./merge-sort";
import {QuickSort} from "./quick-sort";
import {SelectionSort} from "./selection-sort";

@Component({
    selector: "sort",
    templateUrl: "./sort.component.html",
    styleUrls: ["../../data-structures/data-structure.css", "../../data-structures/queue/queue.component.css", "./sort.component.css"]
})
export class SortComponent implements OnInit {
    private _dataType: string = "number";
    public get dataType(): string { return this._dataType; }

    private _sortType: string = "bubble";
    public get sortType(): string { return this._sortType; }

    private _unsortedItems: Array<any>;
    public get unsortedItems(): Array<any> { return this._unsortedItems; }

    private _sortedItems: Array<any>;
    public get sortedItems(): Array<any> { return this._sortedItems; }

    private _sortResult: ISortResult;
    public get sortResult(): ISortResult { return this._sortResult; }

    private _algorithm: ISortAlgorithm;

    public ngOnInit(): void {
        this._algorithm = new BubbleSort();
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

        switch (type) {
            case "bubble": this._algorithm = new BubbleSort(); break;
            case "insertion": this._algorithm = new InsertionSort(); break;
            case "merge": this._algorithm = new MergeSort(); break;
            case "quick": this._algorithm = new QuickSort(); break;
            case "selection": this._algorithm = new SelectionSort(); break;
        }
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