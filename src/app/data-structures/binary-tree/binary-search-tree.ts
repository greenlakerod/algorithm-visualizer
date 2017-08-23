/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {BinaryTree} from "./binary-tree";
import {BinaryTreeNode} from "./binary-tree-node";

export class BinarySearchTree<T> extends BinaryTree<T> {
    public add(value: T): void {
        let node: BinaryTreeNode<T> = new BinaryTreeNode<T>(value);
        if (!this._root) {
            this._root = node;
        } else {
            this.addNode(node, this._root);
        }

        this._treeView = [BinaryTreeNode.convertToTreeViewNode(this._root)];
        console.log(JSON.stringify(this._root));
    }
    public find(value: T): BinaryTreeNode<T> {
        return this.findNode(value, this._root);
    }
    public remove(value: T): void {}

    protected addNode(newNode: BinaryTreeNode<T>, root: BinaryTreeNode<T>): void {
        if (parseInt(newNode.value.toString()) < parseInt(root.value.toString())) {
            if (root.left == null || !root.left) {
                root.left = newNode;
            } else {
                this.addNode(newNode, root.left);
            }
        } else {
            if (root.right == null || !root.right) {
                root.right = newNode;
            } else {
                this.addNode(newNode, root.right);
            }
        }
    }
    protected findNode(value: T, current: BinaryTreeNode<T>, parent?: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (current == null || !current) {
            return null;
        }

        let c: number = parseInt(current.value.toString());
        let v: number = parseInt(value.toString());

        if (c === v) {
            return current;
        } else if (v < c) {
            return this.findNode(value, current.left, current);
        } else {
            return this.findNode(value, current.right, current);
        }
    }
}