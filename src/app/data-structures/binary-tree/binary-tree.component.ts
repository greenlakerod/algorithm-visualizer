/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {Component, OnInit} from "@angular/core";
//import * as $ from "jquery";
import {IBinaryTree, BinaryTree} from "./binary-tree";
import {BinarySearchTree} from "./binary-search-tree";
import {AVLTree} from "./avl-tree";

@Component({
    selector: "binary-tree",
    templateUrl: "./binary-tree.component.html",
    styleUrls: ["../../data-structure.css", "./binary-tree.component.css"]
})
export class BinaryTreeComponent implements OnInit {
    static treeViewSelector: string = "#tree-view";

    private _tree: IBinaryTree;
    private _treeType = "bst";
    private _dataType = "number";

    public ngOnInit(): void {
        this.setType();
        //(<any>$(BinaryTreeComponent.treeViewSelector)).treeview({ data: this._tree.treeView });
    }

    public setType(): void {
        if (this._tree) {
            this._tree.clear();
        }

        switch (this._dataType) {
            case "string":
                this._tree = this._treeType === "bst" ? new BinarySearchTree<string>() : new AVLTree<string>();
                document.getElementById("item").setAttribute("type", "text");
                break;
            case "number":
                this._tree = this._treeType === "bst" ? new BinarySearchTree<number>() : new AVLTree<number>();
                document.getElementById("item").setAttribute("type", "number");
                break;
            default:
                break;
        }
    }

    public add(value: any): void {
        this._tree.add(value);
        $(BinaryTreeComponent.treeViewSelector).treeview({ data: this._tree.treeView });
    }
    public remove(value: any): void {
        this._tree.remove(value);
    }
    public clear(): void {
        this._tree.clear();
        $(BinaryTreeComponent.treeViewSelector).treeview("remove");
    }
    public onTreeTypeChange(type: string): void {
        this._treeType = type;
        this.setType();
    }
    public onDataTypeChange(type: string): void {
        this._dataType = type;
        this.setType();
    }
}