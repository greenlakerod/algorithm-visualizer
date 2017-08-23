/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />
import {INode} from "../data-structure-node";

export interface IBinaryTreeNode extends INode {
    value: any;
    left: IBinaryTreeNode;
    right: IBinaryTreeNode;
}

export class BinaryTreeNode<T> implements IBinaryTreeNode {
    public left: BinaryTreeNode<T>;
    public right: BinaryTreeNode<T>;

    static convertToTreeViewNode(node: IBinaryTreeNode): BootstrapTreeViewNodeData {
        let treeViewNode = <BootstrapTreeViewNodeData>{
            text: node.value.toString(),
            nodes: []
        };

        if (node.left) {
            treeViewNode.nodes.push(this.convertToTreeViewNode(node.left));
        }
        if (node.right) {
            treeViewNode.nodes.push(this.convertToTreeViewNode(node.right));
        }

        return treeViewNode;
    }

    constructor(public value: T) {
        //this.left = null;
        //this.right = null;
    }

    public compareTo(v: T): number {
        if (this.value > v) { return 1; }
        if (this.value < v) { return -1; }
        return 0;
    };
}