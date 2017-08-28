import {LinkedList} from "../linked-list/linked-list";
import {IQueue} from "../queue/queue";
import {LinkedListQueue} from "../queue/linked-list-queue";

export class Graph {
    private _adjacencyMatrix: Array<LinkedList<number>>;

    public get count(): number { return this._adjacencyMatrix.length; }
    public get adjacencyMatrix(): Array<LinkedList<number>> { return this._adjacencyMatrix; }

    constructor(count: number) {
        if (count !== undefined) {
            this._adjacencyMatrix = new Array<LinkedList<number>>(count);
        } else {
            this._adjacencyMatrix = [];
        }
    }

    public addVertex(vertex?: number) {
        if (vertex != undefined) {
            if (!this._adjacencyMatrix[vertex]) {
                this._adjacencyMatrix[vertex] = new LinkedList<number>();
            }
        } else {
            this._adjacencyMatrix.push(new LinkedList<number>());
        }
    }
    public addEdge(vertex: number, adjacentVertex: number) {
        if (!this._adjacencyMatrix[vertex]) {
            throw `No vertex '${vertex}' exists`;
        }
        if (!this._adjacencyMatrix[adjacentVertex]) {
            throw `No vertex '${adjacentVertex}' exists`;
        }

        if (!this._adjacencyMatrix[vertex].contains(adjacentVertex)) {
            this._adjacencyMatrix[vertex].addLast(adjacentVertex);

            //for now, undirected. so add a reference the other way
            this.addEdge(adjacentVertex, vertex);
        }
    }
    public traverseBreadthFirst(vertex: number): Array<number> {
        let output: Array<number> = [];

        // Mark all the vertices as not visited
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);

        // Mark the current node as visited and enqueue it
        let queue: IQueue = new LinkedListQueue();
        visited[vertex] = true;
        queue.enqueue(vertex);

        while (queue.count > 0) {
            let v = queue.dequeue();
            output.push(v);

            let list: LinkedList<number> = this._adjacencyMatrix[v];
            let iterator: Array<number> = new Array<number>(list.count);
            list.copyTo(iterator);

            for (let i = 0; i < iterator.length; i++) {
                let n = iterator[i];
                if (!visited[n]) {
                    visited[n] = true;
                    queue.enqueue(n);
                }
            }
        }

        return output;
    }
    public traverseDepthFirst(vertex: number): Array<number> {
        let output: Array<number> = [];

        // Mark all the vertices as not visited
        let visited: Array<boolean> = new Array<boolean>(this.count).fill(false);

        this._traverseDepthFirst(vertex, visited, output);

        return output;
    }

    private _traverseDepthFirst(vertex: number, visited: Array<boolean>, output: Array<number>) {
        visited[vertex] = true;
        output.push(vertex);

        let list: LinkedList<number> = this._adjacencyMatrix[vertex];
        let iterator: Array<number> = new Array<number>(list.count);
        list.copyTo(iterator);

        for (let i = 0; i < iterator.length; i++) {
            let n = iterator[i];
            if (!visited[n]) {
                this._traverseDepthFirst(n, visited, output);
            }
        }
    }
}