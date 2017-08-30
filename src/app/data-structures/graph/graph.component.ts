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
    private _traversalResults: Array<number>;

    public get count(): number { return this._graph.count; }
    public get items(): Array<LinkedList<number>> { return this._graph.adjacencyMatrix; }

    public get traversalResults(): Array<number> { return this._traversalResults; }

    constructor() {}

    public ngOnInit(): void {
        this._graph = new Graph();
    }

    public setVertices(count: number): void {
        for (let i = 0; i < count; i++) {
            this._graph.addVertex(i);
        }
    }

    public clear(): void {
        for (let i = 0; i < this._graph.count; i++) {
            let vertex = this._graph.adjacencyMatrix[i];
            vertex.clear();
        }

        this._traversalResults = [];
        this._graph = new Graph();
    }

    public setEdge(event: any) {
        event.preventDefault();

        let vertex: string;
        let adjacentVertex: string;
        [vertex, adjacentVertex] = (<string>event.srcElement.attributes.id.nodeValue).split("_");
        
        if (!event.target.classList.contains("edge")) {
            event.target.classList.add("edge");
            this._graph.addEdge(parseInt(vertex), parseInt(adjacentVertex));

            if (adjacentVertex != vertex) {
                // let adjacentElement = document.querySelector(`#${adjacentVertex}_${vertex}`);
                // adjacentElement.classList.add("edge");
                $(`#${adjacentVertex}_${vertex}`).addClass("edge");
            }

        } else {
            event.target.classList.remove("edge");
            this._graph.removeEdge(parseInt(vertex), parseInt(adjacentVertex));

            if (adjacentVertex != vertex) {
                // let adjacentElement = document.querySelector(`#${adjacentVertex}_${vertex}`);
                // adjacentElement.classList.remove("edge");
                $(`#${adjacentVertex}_${vertex}`).removeClass("edge");
            }
        }
    }

    public traverse(vertex: number, traversalType: string): void {
        let results: Array<number> = [];
        if (traversalType == "breadthfirst") {
            results = this._graph.traverseBreadthFirst(vertex);
        } else {
            results = this._graph.traverseDepthFirst(vertex);
        }

        for (let i = 0; i < results.length; i++) {
            results[i] = results[i] + 1;
        }

        this._traversalResults = results;

    }
}