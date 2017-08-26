/// <reference path="../../../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {Component, OnInit} from "@angular/core";
import {IBinaryTree, BinaryTree} from "./binary-tree";
import {BinarySearchTree} from "./binary-search-tree";
import {AVLTree} from "./avl-tree";
import {WebWorkerService} from "angular2-web-worker/web-worker.service";
//import {WebWorkerService} from "angular2-web-worker/web-worker.service";

import * as WorkerPath from "file-loader?name=[name].js!./binary-tree.worker";

@Component({
    providers: [WebWorkerService],
    selector: "binary-tree",
    templateUrl: "./binary-tree.component.html",
    styleUrls: ["../../data-structure.css", "./binary-tree.component.css"]
})
export class BinaryTreeComponent implements OnInit {
    static treeViewSelector: string = "#tree-view";

    private _tree: IBinaryTree;
    private _treeType = "bst";
    private _dataType = "number";
    private _worker: Worker;

    constructor(private _webWorkerService: WebWorkerService) {}

    public ngOnInit(): void {
        this.setType();
        //(<any>$(BinaryTreeComponent.treeViewSelector)).treeview({ data: this._tree.treeView });

        //this.initWebWorker();
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
        //this._worker.postMessage(value);
        // try {
            // let self = this;
            // const promise = this._webWorkerService.run(self._tree.add, value);
            // promise.then((result: any) => { $(BinaryTreeComponent.treeViewSelector).treeview({ data: self._tree.treeView }); })
            //     .catch((e) => { alert(JSON.stringify(e)); });
        // } catch (e) {
        //     alert(JSON.stringify(e));
        // }
        
        this._tree.add(value);
        $(BinaryTreeComponent.treeViewSelector).treeview({ data: this._tree.treeView });
    }
    public remove(value: any): void {
        // let self = this;
        // const promise = this._webWorkerService.run(self._tree.remove, value);
        // promise.then((result: any) => { $(BinaryTreeComponent.treeViewSelector).treeview({ data: self._tree.treeView }); })
        //     .catch((e) => { alert(JSON.stringify(e)); });
        this._tree.remove(value);
        $(BinaryTreeComponent.treeViewSelector).treeview({ data: this._tree.treeView });
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

    protected initWebWorker(script: string) {
        // //let url: URL = window.URL || (<any>window).webkitURL;
        // //let Blob = window.Blob;
        // // let Worker = (<any>window).Worker;
        
        // // if (!URL || !Blob || !(<any>window).Worker || !script) {
        // //     return null;
        // // }
        
        // // let blob = new Blob([script]);
        // // let worker: Worker = new Worker();
        // // return worker;

        // this._worker = new Worker(WorkerPath);
        // this._worker.addEventListener("message", (evt: MessageEvent) => {
        //     console.log(JSON.stringify(evt));
        // });
        // this._worker.onmessage = (evt: MessageEvent) => {
        //     //$(BinaryTreeComponent.treeViewSelector).treeview({ data: this._tree.treeView });
        // };
    }
}