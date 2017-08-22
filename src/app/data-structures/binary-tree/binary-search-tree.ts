/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {BinaryTree} from "./binary-tree";
import {BinaryTreeNode} from "./binary-tree-node";

export class BinarySearchTree<T> extends BinaryTree<T> {
    public add(value: T): void {
        if (!this._root) {
            this._root = new BinaryTreeNode<T>(value);
        } else {
            this.addNode(value, this._root);
        }
    }
    public remove(value: T): void {}

    protected addNode(value: T, node: BinaryTreeNode<T>): void {
        if (value < node.value) {
            if (!node.left) {
                node.left = new BinaryTreeNode<T>(value);
            } else {
                this.addNode(value, node.left);
            }
        } else {
            if (!node.right) {
                node.right = new BinaryTreeNode<T>(value);
            } else {
                this.addNode(value, node.right);
            }
        }
    }
}