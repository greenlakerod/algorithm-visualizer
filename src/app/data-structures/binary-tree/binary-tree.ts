
//https://github.com/jonmiles/bootstrap-treeview
//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/bootstrap-treeview
/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />
import {IBinaryTreeNode, BinaryTreeNode} from "./binary-tree-node";
import {LinkedListStack} from "../stack/linked-list-stack";

export interface IBinaryTree {
    height: number;
    width: number;
    treeView: Array<BootstrapTreeViewNodeData>;
    add: (value: any) => void;
    remove: (value: any) => void;
    find: (value: any) => IBinaryTreeNode;
    clear: () => void;
    traverse: (order: "inorder" | "preorder" | "postorder" | "levelorder", nodes: Array<any>, recursive?: boolean) => void;
}

export abstract class BinaryTree<T> implements IBinaryTree {
    protected _root: BinaryTreeNode<T>;
    protected _treeView: Array<BootstrapTreeViewNodeData> = [];
    
    public get height(): number { return this.nodeHeight(this._root); }
    public get width(): number { return this.nodeWidth(this._root, this.height); }
    public get treeView(): Array<BootstrapTreeViewNodeData> { return this._treeView; }

    public abstract add(value: T): void;
    public abstract remove(value: T): void;
    public abstract find(value: T): BinaryTreeNode<T>;

    // depth first: http://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
    // breadth first: http://www.geeksforgeeks.org/?p=2686
    public traverse(order: "inorder" | "preorder" | "postorder" | "levelorder", nodes: Array<T>, recursive: boolean = true): void {
        let fn: (node: BinaryTreeNode<T>, nodes: Array<T>, recursive: boolean) => void;

        switch (order) {
            case "inorder": fn = this.traverseInOrder; break;
            case "preorder": fn = this.traversePreOrder; break;
            case "postorder": fn = this.traversePostOrder; break;
            case "levelorder": fn = this.traverseLevelOrder; break;
            default: break;
        }

        if (fn) {
            fn.call(this, this._root, nodes, recursive);
            console.log(`traversal (${order}): ${nodes}`);
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
    protected traverseInOrder(node: BinaryTreeNode<T>, nodes: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                this.traverseInOrder(node.left, nodes, recursive);
                nodes.push(node.value);
                this.traverseInOrder(node.right, nodes, recursive);
            } else {
                let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
                let n: BinaryTreeNode<T> = node;

                do {
                    while (n) {
                        stack.push(n);
                        n = n.left;
                    }
                    if (stack.size > 0) {
                        n = stack.pop();
                        nodes.push(n.value);

                        n = n.right;
                    }
                } while (stack.size > 0 || n);
            }
        }
    }
    protected traversePreOrder(node: BinaryTreeNode<T>, nodes: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                nodes.push(node.value);
                this.traversePreOrder(node.left, nodes, recursive);
                this.traversePreOrder(node.right, nodes, recursive);
            } else {
                let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
                let n: BinaryTreeNode<T> = node;

                do {
                    while (n) {
                        stack.push(n);
                        nodes.push(n.value);

                        n = n.left;
                    }
                    if (stack.size > 0) {
                        n = stack.pop();
                        n = n.right;
                    }
                } while (stack.size > 0 || n);
            }
        }
    }
    protected traversePostOrder(node: BinaryTreeNode<T>, nodes: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                this.traversePostOrder(node.left, nodes, recursive);
                this.traversePostOrder(node.right, nodes, recursive);
                nodes.push(node.value);
            } else {
                let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
                let n: BinaryTreeNode<T> = node;
                let prev: BinaryTreeNode<T>;

                do {
                    while (n) {
                        stack.push(n);
                        n = n.left;
                    }
                    while (!n && stack.size > 0) {
                        n = stack.peek();
                        if (!n.right || n.right == prev) {
                            nodes.push(n.value);
                            stack.pop();

                            prev = n;
                            n = undefined; //null;
                        } else {
                            n = n.right;
                        }
                    }
                } while (stack.size > 0);
            }
        }
    }  
    protected traverseLevelOrder(node: BinaryTreeNode<T>, nodes: Array<T>, recursive: boolean): void {
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

    protected nodeHeight(node: BinaryTreeNode<T>): number {
        if (!node) {
            return 0;
        }

        let leftHeight = this.nodeHeight(node.left);
        let rightHeight = this.nodeHeight(node.right);

        return 1 + Math.max(leftHeight, rightHeight);
    }
    protected nodeWidth(node: BinaryTreeNode<T>, level: number): number {
        if (!node) { return 0; }
        if (level == 1) { return 1; }

        let leftWidth = this.nodeWidth(node.left, level - 1);
        let rightWidth = this.nodeWidth(node.right, level - 1);

        return leftWidth + rightWidth;
    }
}