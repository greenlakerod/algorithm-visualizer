/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />
import {INode} from "../data-structure-node";
import {ArrayStack} from "../stack/array-stack";

export interface IBinaryTreeNode extends INode {
    value: any;
    left: IBinaryTreeNode;
    right: IBinaryTreeNode;
}

export class BinaryTreeNode<T> implements IBinaryTreeNode {
    public left: BinaryTreeNode<T>;
    public right: BinaryTreeNode<T>;

    static convertToTreeViewNode(node: IBinaryTreeNode, role?: string): BootstrapTreeViewNodeData {
        if (!node) {
            return null;
        }

        let treeViewNode: BootstrapTreeViewNodeData = <BootstrapTreeViewNodeData>{
            text: node.value.toString(),
            nodes: []
        };
        if (role) { treeViewNode.text += ` (${role})`; }

        let stack: ArrayStack<{node: IBinaryTreeNode, treeViewNode: BootstrapTreeViewNodeData, role?: string}> = new ArrayStack<{node: IBinaryTreeNode, treeViewNode: BootstrapTreeViewNodeData, role?: string}>();
        stack.push({ node: node.left, treeViewNode, role: "left" });
        stack.push({ node: node.right, treeViewNode, role: "right" });

        while (stack.peek()) {
            let n = stack.pop();
            if (!n.node) {
                continue;
            }

            let tvn: BootstrapTreeViewNodeData = <BootstrapTreeViewNodeData>{
                text: n.node.value.toString(),
                nodes: []
            };
            if (n.role) { tvn.text += ` (${n.role})`; }
            n.treeViewNode.nodes.push(tvn);

            stack.push({ node: n.node.left, treeViewNode: tvn, role: "left" });
            stack.push({ node: n.node.right, treeViewNode: tvn, role: "right" });
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