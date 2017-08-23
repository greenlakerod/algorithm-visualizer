
//https://github.com/jonmiles/bootstrap-treeview
//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/bootstrap-treeview
/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />
import {IBinaryTreeNode, BinaryTreeNode} from "./binary-tree-node";

export interface IBinaryTree {
    height: number;
    width: number;
    treeView: Array<BootstrapTreeViewNodeData>;
    add: (value: any) => void;
    remove: (value: any) => void;
    find: (value: any) => IBinaryTreeNode;
    clear: () => void;
    traverse: (order: "inorder" | "preorder" | "postorder" | "levelorder", nodes: Array<any>) => void;
}

export abstract class BinaryTree<T> implements IBinaryTree {
    protected _root: BinaryTreeNode<T>;
    protected _treeView: Array<BootstrapTreeViewNodeData> = [];
    
    public get height(): number { return -1; }
    public get width(): number { return -1; }
    public get treeView(): Array<BootstrapTreeViewNodeData> { return this._treeView; }

    public abstract add(value: T): void;
    public abstract remove(value: T): void;
    public abstract find(value: T): BinaryTreeNode<T>;

    // depth first: http://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
    // breadth first: http://www.geeksforgeeks.org/?p=2686
    public traverse(order: "inorder" | "preorder" | "postorder" | "levelorder", nodes: Array<any>): void {
        let fn: (node: BinaryTreeNode<T>, nodes: Array<T>) => void;

        switch (order) {
            case "inorder": fn = this.traverseInOrder; break;
            case "preorder": fn = this.traversePreOrder; break;
            case "postorder": fn = this.traversePostOrder; break;
            case "levelorder": fn = this.traverseLevelOrder; break;
            default: break;
        }

        if (fn) {
            fn(this._root, nodes);
        }
    }
    public clear(): void {
        this.clearTree(this._root);
        delete this._root;

        this._treeView = [];
    }
    protected clearTree(node: BinaryTreeNode<T>): void {
        if (node) {
            this.clearTree(node.left);
            delete node.left;

            this.clearTree(node.right);
            delete node.right;

            //node = null;
        }
    }
    protected traverseInOrder(node: BinaryTreeNode<T>, nodes: Array<T>): void {
        if (node) {
            this.traverseInOrder(node.left, nodes);
            nodes.push(node.value);
            this.traverseInOrder(node.right, nodes);
        }
    }
    protected traversePreOrder(node: BinaryTreeNode<T>, nodes: Array<T>): void {
        if (node) {
            nodes.push(node.value);
            this.traversePreOrder(node.left, nodes);
            this.traversePreOrder(node.right, nodes);
        }
    }
    protected traversePostOrder(node: BinaryTreeNode<T>, nodes: Array<T>): void {
        if (node) {
            this.traversePostOrder(node.left, nodes);
            this.traversePostOrder(node.right, nodes);
            nodes.push(node.value);
        }
    }  
    protected traverseLevelOrder(node: BinaryTreeNode<T>, nodes: Array<T>): void {
        for (let i = 1; i <= this.height; i++) {
            this.printLevel(this._root, nodes, i);
        }
    }
    protected printLevel(node: BinaryTreeNode<T>, nodes: Array<T>, level: number): void {
        if (node) {
            if (level === 1) {
                nodes.push(node.value);
            } else if (level > 1) {
                this.printLevel(node.left, nodes, level - 1);
                this.printLevel(node.right, nodes, level - 1);
            }
        }
    }
}