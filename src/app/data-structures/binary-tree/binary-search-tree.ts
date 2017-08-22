import {BinaryTree} from "./binary-tree";
import {TreeNode} from "./tree-node";

export class BinarySearchTree<T> extends BinaryTree<T> {
    public add(value: T): void {
        if (!this._root) {
            this._root = new TreeNode<T>(value);
        } else {
            this.addNode(value, this._root);
        }
    }
    public remove(value: T): void {}

    protected addNode(value: T, node: TreeNode<T>): void {
        if (value < node.value) {
            if (!node.left) {
                node.left = new TreeNode<T>(value);
            } else {
                this.addNode(value, node.left);
            }
        } else {
            if (!node.right) {
                node.right = new TreeNode<T>(value);
            } else {
                this.addNode(value, node.right);
            }
        }
    }
}