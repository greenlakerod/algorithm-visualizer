import {Component, OnInit} from "@angular/core";

@Component({
    selector: "search",
    templateUrl: "./search.component.html",
    styleUrls: ["../../data-structures/data-structure.css", "./search.component.css"]
})
export class SearchComponent implements OnInit {
    private _searchType: string = "string";
    public get searchType(): string { return this._searchType; }

    public ngOnInit(): void {}

    public onSearchTypeChange(type: string): void {
        this._searchType = type;
    }
}
