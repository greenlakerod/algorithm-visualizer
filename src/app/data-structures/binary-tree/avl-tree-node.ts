import {IBinaryTreeNode, BinaryTreeNode} from "./binary-tree-node";
import {AVLTree} from "./avl-tree";

export enum TreeState {
    balanced,
    leftHeavy,
    rightHeavy
}

export interface IAVLTreeNode extends IBinaryTreeNode {
    parent: IAVLTreeNode;
    state: TreeState;
    balance: () => void;
}

export class AVLTreeNode<T> extends BinaryTreeNode<T> implements IAVLTreeNode {
    private _tree: AVLTree<T>;
    private _left: AVLTreeNode<T>;
    private _right: AVLTreeNode<T>;

    public parent: AVLTreeNode<T>;

    public get state(): TreeState {
        let leftHeight = this.left ? this.left.height : 0;
        let rightHeight = this.right ? this.right.height : 0;

        if ((leftHeight - rightHeight) > 1) { return TreeState.leftHeavy; }
        if ((rightHeight - leftHeight) > 1) { return TreeState.rightHeavy; }

        return TreeState.balanced;
    }
    public get balanceFactor(): number {
        let leftHeight = this.left ? this.left.height : 0;
        let rightHeight = this.right ? this.right.height : 0;

        return rightHeight - leftHeight;
    }

    public get left(): AVLTreeNode<T> { return this._left; }
    public set left(node: AVLTreeNode<T>) {
        this._left = node;
        if (this._left) { //if (this._left != null && this._left != undefined) {
            this._left.parent = this;
        }
    }

    public get right(): AVLTreeNode<T> { return this._right; }
    public set right(node: AVLTreeNode<T>) {
        this._right = node;
        if (this._right) { //if (this._right != null && this._right != undefined) {
            this._right.parent = this;
        }
    }

    constructor(value: T, parent: AVLTreeNode<T>, tree: AVLTree<T>) {
        super(value);

        this.parent = parent;
        this._tree = tree;
    }
    
    public balance(): void {
        if (this.state == TreeState.rightHeavy) {
            if (this.right && this.right.balanceFactor < 0) {
                this.leftRightRotation();
            } else {
                this.leftRotation();
            }
        } else if (this.state == TreeState.leftHeavy) {
            if (this.left && this.left.balanceFactor > 0) {
                this.rightLeftRotation();
            } else {
                this.rightRotation();
            }
        }
    }
    public leftRotation(): void {
        //     a (this)
        //      \
        //       b
        //        \
        //         c
        //
        // becomes
        //       b
        //      / \
        //     a   c

        let newRoot: AVLTreeNode<T> = this.right;

        // replace the current root with the new root
        this._replaceRoot(newRoot);

        // take ownership of right's left child as right (now parent)
        this.right = newRoot.left;

        // new root takes current node as its left
        newRoot.left = this;
    }
    public rightRotation(): void {
        //     c (this)
        //    /
        //   b
        //  /
        // a
        //
        // becomes
        //       b
        //      / \
        //     a   c

        let newRoot: AVLTreeNode<T> = this.left;

        // replace the current root with the new root
        this._replaceRoot(newRoot);

        // take ownership of left's right child as left (now parent)
        this.left = newRoot.right;

        // new root takes current node as its right
        newRoot.right = this;
    }
    public leftRightRotation(): void {
        this.right.rightRotation();
        this.leftRotation();
    }
    public rightLeftRotation(): void {
        this.left.leftRotation();
        this.rightRotation();
    }

    private _replaceRoot(newRoot: AVLTreeNode<T>): void {
        //set the left or right child of this node's parent
        if (this.parent) {
            if (this.parent.left == this) {
                this.parent.left = newRoot;
            } else if (this.parent.right == this) {
                this.parent.right = newRoot;
            }
        } else {
            this._tree.root = newRoot;
        }

        //set the parent of the new root
        newRoot.parent = this.parent;

        //set the parent of the current node to the new root
        this.parent = newRoot;
    }
}