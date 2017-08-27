import {BinaryTree} from "./binary-tree";
import {BinarySearchTree} from "./binary-search-tree";
import {BinaryTreeNode} from "./binary-tree-node";
import {AVLTreeNode} from "./avl-tree-node";

export class AVLTree<T> extends BinarySearchTree<T> {
    public get root(): AVLTreeNode<T> { return <AVLTreeNode<T>>this._root; }
    public set root(r: AVLTreeNode<T>) { this._root = r; }

    public remove(value: T): void {
        let node: AVLTreeNode<T> = <AVLTreeNode<T>>this.find(value);

        if (node) {
            let treeToBalance: AVLTreeNode<T> = node.parent;

            // Case 1: If current has no right child, then current's left replaces current
            if (!node.right) {
                if (!node.parent) { //no parent means the current node is the root
                    this.root = node.left;
                    if (this.root) {
                        this.root.parent = null;
                    }
                } else {
                    if (node.parent.value > node.value) { //make the current left child a left child of the parent
                        node.parent.left = node.left;
                    } else if (node.parent.value < node.value) { //make the current left child a right child of the parent
                        node.parent.right = node.left;
                    }
                }
            }
            // Case 2: If current's right child has no left child, then current's right child replaces current
            else if (!node.right.left) {
                node.right.left = node.left;

                if (!node.parent) { //no parent means the current node is the root
                    this.root = node.right;
                    if (this.root) {
                        this.root.parent = null;
                    }
                } else {
                    if (node.parent.value > node.value) { //make the current right child a left child of parent
                        node.parent.left = node.right;
                    } else if (node.parent.value < node.value) { //make the current right child a right child of parent
                        node.parent.right = node.right;
                    }
                }
            }
            // Case 3: If current's right child has a left child, replace current with current's right child's left-most child
            else {
                let min = <AVLTreeNode<T>>this._findMinValueNode(node.right);

                // the parent's left subtree becomes the leftmost's right subtree
                min.parent.left = min.right;

                // assign leftmost's left and right to current's left and right children
                min.left = node.left;
                min.right = node.right;

                if (!node.parent) { //no parent means the current node is the root
                    this.root = node.right;
                    if (this.root) {
                        this.root.parent = null;
                    }
                } else {
                    if (node.parent.value > node.value) { //make leftmost the parent's left child
                        node.parent.left = min;
                    } else if (node.parent.value < node.value) { //make leftmost the parent's right child
                        node.parent.right = min;
                    }
                }
            }

            if (treeToBalance) {
                treeToBalance.balance();
            } else if (this.root) {
                this.root.balance();
            }
        }
    }

    protected _addNode(newNode: AVLTreeNode<T>, root: AVLTreeNode<T>): void {
        super._addNode(newNode, root);
        root.balance();
    }
}