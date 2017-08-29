import {Component, OnInit} from "@angular/core";
import {LinkedList} from "../linked-list/linked-list";
import {Graph} from "./graph";

@Component({
    selector: "graph",
    templateUrl: "./graph.component.html",
    styleUrls: ["../../data-structure.css", "../../../data-structures/queue/queue.component.css", "./graph.component.css"]
})
export class GraphComponent implements OnInit {
    static treeViewSelector: string = "#tree-view";  //$(GraphComponent.treeViewSelector).treeview({ data: ... });

    private _graph: Graph;

    public get count(): number { return this._graph.count; }
    public get items(): Array<LinkedList<number>> { return this._graph.adjacencyMatrix; }

    public ngOnInit(): void {
        this._graph = new Graph();
    }

    public add(count: number): void {
        for (let i = 0; i < count; i++) {
            this._graph.addVertex(i);
        }
    }
}