import {IBinaryTreeNode, BinaryTreeNode} from "./binary-tree-node";

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
    private _left: AVLTreeNode<T>;
    private _right: AVLTreeNode<T>;

    private _parent: AVLTreeNode<T>;
    private _balanceFactor(): number {
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

    public get state(): TreeState {
        let leftHeight = this.left ? this.left.height : 0;
        let rightHeight = this.right ? this.right.height : 0;

        if ((leftHeight - rightHeight) > 1) { return TreeState.leftHeavy; }
        if ((rightHeight - leftHeight) > 1) { return TreeState.rightHeavy; }

        return TreeState.balanced;
    }
    public get parent(): AVLTreeNode<T> { return this._parent; }

    public balance(): void { }

    private _leftRotation(): void {
        //     a
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

    private _rightRotation(): void {
    }

    private _replaceRoot(newRoot: AVLTreeNode<T>): void {
    }
}