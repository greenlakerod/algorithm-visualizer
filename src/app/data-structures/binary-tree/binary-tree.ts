
//https://github.com/jonmiles/bootstrap-treeview
//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/bootstrap-treeview
/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />
import {IBinaryTreeNode, BinaryTreeNode} from "./binary-tree-node";
import {LinkedListStack} from "../stack/linked-list-stack";

export interface IBinaryTree {
    height: number;
    width: number;
    count: number;
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
    protected _count: number;
    
    public get height(): number { return this._root ? this._root.height : 0; }
    public get width(): number { return this._root ? this._root.width : 0; }
    public get treeView(): Array<BootstrapTreeViewNodeData> { return this._treeView; }
    public get count(): number { return this._count; }

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
    public buildTree(nodes: Array<T>, order: "inorder" | "preorder" | "postorder" | "levelorder"): void {
        this._root = null;
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
    protected traverseInOrder(node: BinaryTreeNode<T>, output: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                this.traverseInOrder(node.left, output, recursive);
                output.push(node.value);
                this.traverseInOrder(node.right, output, recursive);
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
                        output.push(n.value);

                        n = n.right;
                    }
                } while (stack.size > 0 || n);
            }
        }
    }
    protected traversePreOrder(node: BinaryTreeNode<T>, output: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                output.push(node.value);
                this.traversePreOrder(node.left, output, recursive);
                this.traversePreOrder(node.right, output, recursive);
            } else {
                let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
                let n: BinaryTreeNode<T> = node;

                do {
                    while (n) {
                        stack.push(n);
                        output.push(n.value);

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
    protected traversePostOrder(node: BinaryTreeNode<T>, output: Array<T>, recursive: boolean): void {
        if (node) {
            if (recursive) {
                this.traversePostOrder(node.left, output, recursive);
                this.traversePostOrder(node.right, output, recursive);
                output.push(node.value);
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
                            output.push(n.value);
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
    protected traverseLevelOrder(node: BinaryTreeNode<T>, output: Array<T>, recursive: boolean): void {
        for (let i = 1; i <= this.height; i++) {
            this._traverseLevelOrder(this._root, output, i);
        }
    }
    protected _traverseLevelOrder(node: BinaryTreeNode<T>, output: Array<T>, level: number): void {
        if (node) {
            if (level === 1) {
                output.push(node.value);
            } else if (level > 1) {
                this._traverseLevelOrder(node.left, output, level - 1);
                this._traverseLevelOrder(node.right, output, level - 1);
            }
        }
    }
    private _buildTreeInOrder(nodes: Array<T>): void {
        if (nodes && nodes.length > 0) {
            let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
            
            for (let i = 0; i < nodes.length; i++) {
                let value = nodes[i];
                let n = new BinaryTreeNode<T>(value);

                if (i == 0) {
                    this._root = n;
                }

                


            }
            

        }
    }
}