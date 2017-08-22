import {INode} from "../data-structure-node";

export interface ITreeNode extends INode {
    value: any;
    left: ITreeNode;
    right: ITreeNode;
}

export class TreeNode<T> implements ITreeNode {
    public left: TreeNode<T>;
    public right: TreeNode<T>;

    public compareTo = (v: T): number => {
        if (this.value > v) { return 1; }
        if (this.value < v) { return -1; }
        return 0;
    };

    constructor(public value: T) {
        this.left = null;
        this.right = null;
    }
}