/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {BinaryTree} from "./binary-tree";
import {BinaryTreeNode} from "./binary-tree-node";

export class BinarySearchTree<T> extends BinaryTree<T> {
    public add(value: T): void {
        let node: BinaryTreeNode<T> = new BinaryTreeNode<T>(value);
        if (!this._root) {
            this._root = node;
        } else {
            this._addNode(node, this._root);
        }

        this._count++;

        this._treeView = [BinaryTreeNode.convertToTreeViewNode(this._root)];
        console.log(JSON.stringify(this._root));
    }
    public find(value: T): BinaryTreeNode<T> {
        let parent: { node?: BinaryTreeNode<T>, relationship?: string } = {};
        return this._findNode(value, this._root, parent);
    }
    public remove(value: T): void {
        let parent: { node?: BinaryTreeNode<T>, relationship?: string } = {};
        let node: BinaryTreeNode<T> = this._findNode(value, this._root, parent);

        if (node) {
            //let nodePtr: { node?: BinaryTreeNode<T> } = { node: node };
            //this.removeNode(nodePtr, parent);

            let childCount = 0;
            if (node.left) { childCount++; }
            if (node.right) { childCount++; }
    
            if (childCount === 0) {
                node = null;
            } else {
                if (childCount === 1) {
                    if (node.right) {
                        node = node.right;
                    } else {
                        node = node.left;
                    }
                } else { //two children
                    let min = this._findMinValueNode(node.right);
                    if (min !== node.right) {
                        if (min.right) {
                            let r = min.right;
                            while (r.right) {
                                r = r.right;
                            }
                            
                            r.right = node.right;
                        } else {
                            min.right = node.right;
                        }
                    }
                    min.left = node.left;                    
    
                    node = min;
                    min = null;
                }
            }

            if (!parent.node) { //found the root
                this._root = node;
            } else {
                if (parent.relationship === "left") {
                    parent.node.left = node;
                } else {
                    parent.node.right = node;
                }
            }
        }

        this._count--;

        this._treeView = [BinaryTreeNode.convertToTreeViewNode(this._root)];
        console.log(JSON.stringify(this._root));
    }

    protected _addNode(newNode: BinaryTreeNode<T>, root: BinaryTreeNode<T>): void {
        if (parseInt(newNode.value.toString()) < parseInt(root.value.toString())) {
            if (!root.left) {  //if (root.left == null || !root.left) {
                root.left = newNode;
            } else {
                this._addNode(newNode, root.left);
            }
        } else {
            if (!root.right) { //if (root.right == null || !root.right) {
                root.right = newNode;
            } else {
                this._addNode(newNode, root.right);
            }
        }
    }
    protected _findNode(value: T, current: BinaryTreeNode<T>, parent: { node?: BinaryTreeNode<T>, relationship?: string }): BinaryTreeNode<T> {
        if (!current) { return null; }
        // if (current == null || !current) {
        //     return null;
        // }

        let c: number = parseInt(current.value.toString());
        let v: number = parseInt(value.toString());

        if (c === v) {
            return current;
        } else if (v < c) {
            parent.node = current;
            parent.relationship = "left";
            return this._findNode(value, current.left, parent);
        } else {
            parent.node = current;
            parent.relationship = "right";
            return this._findNode(value, current.right, parent);
        }
    }
    protected _findMinValueNode(current: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!current) {
            return null;
        }

        let left = this._findMinValueNode(current.left);
        if (left) {
            return left;
        }

        return current;
    }
    protected _removeNode(nodePtr: { node?: BinaryTreeNode<T> }, parent: { node?: BinaryTreeNode<T>, relationship?: string }): void {
        let node = nodePtr.node;

        let childCount = 0;
        if (node.left) { childCount++; }
        if (node.right) { childCount++; }

        if (childCount === 0) {
            node = null;
        } else {
            if (childCount === 1) {
                if (node.right) {
                    node = node.right;
                } else {
                    node = node.left;
                }
            } else { //two children
                let min = this._findMinValueNode(node.right);
                if (min !== node.right) {
                    if (min.right) {
                        let r = min.right;
                        while (r.right) {
                            r = r.right;
                        }
                        
                        r.right = node.right;
                    } else {
                        min.right = node.right;
                    }
                }
                min.left = node.left;                    

                node = min;
                min = null;
            }
        }

        nodePtr.node = node;
    }
}