import {Component, OnInit} from "@angular/core";

@Component({
    selector: "array-search",
    templateUrl: "./array-search.component.html",
    styleUrls: ["../../data-structures/data-structure.css", "../../data-structures/queue/queue.component.css", "./array-search.component.css"]
})
export class ArraySearchComponent implements OnInit {
    private _dataType: string = "number";
    public get DataType(): string { return this._dataType; }

    private _items: Array<any>;
    public get Items(): Array<any> { return this._items; }

    public ngOnInit(): void {
        this.setType();
    }

    public generate(count: string | number): void {
        let ct: number = parseInt(count.toString());
        
    }

    private setType(): void {
        if (this._items) {
            this._items = this._items.splice(0);
        }

        switch (this._dataType) {
            case "number":
                this._items = new Array<number>();
                break;
            default:
                break;
        }
    }
}