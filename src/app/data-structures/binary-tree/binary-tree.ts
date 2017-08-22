import {ITreeNode, TreeNode} from "./tree-node";

export interface IBinaryTree {
    add: (value: any) => void;
    remove: (value: any) => void;
    traverse: (order: "inorder" | "preorder" | "postorder", nodes: Array<any>) => void;
}

export abstract class BinaryTree<T> implements IBinaryTree {
    protected _root: TreeNode<T>;

    public get height(): number { return -1; }
    public get width(): number { return -1; }

    public abstract add(value: T): void;
    public abstract remove(value: T): void;

    // depth first: http://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/
    // breadth first: http://www.geeksforgeeks.org/?p=2686
    public traverse(order: "inorder" | "preorder" | "postorder" | "levelorder", nodes: Array<any>): void {
        let fn: (node: TreeNode<T>, nodes: Array<T>) => void;

        switch (order) {
            case "inorder": fn = this.traverseInOrder; break;
            case "preorder": fn = this.traversePreOrder; break;
            case "postorder": fn = this.traversePostOrder; break;
            case "levelorder": fn = this.traverseLevelOrder; break;
            default: break;
        }

        if (fn) {
            fn(this._root, nodes);
        }
    }

    protected traverseInOrder(node: TreeNode<T>, nodes: Array<T>): void {
        if (node) {
            this.traverseInOrder(node.left, nodes);
            nodes.push(node.value);
            this.traverseInOrder(node.right, nodes);
        }
    }
    protected traversePreOrder(node: TreeNode<T>, nodes: Array<T>): void {
        if (node) {
            nodes.push(node.value);
            this.traversePreOrder(node.left, nodes);
            this.traversePreOrder(node.right, nodes);
        }
    }
    protected traversePostOrder(node: TreeNode<T>, nodes: Array<T>): void {
        if (node) {
            this.traversePostOrder(node.left, nodes);
            this.traversePostOrder(node.right, nodes);
            nodes.push(node.value);
        }
    }  
    protected traverseLevelOrder(node: TreeNode<T>, nodes: Array<T>): void {
        for (let i = 1; i <= this.height; i++) {
            this.printLevel(this._root, nodes, i);
        }
    }
    protected printLevel(node: TreeNode<T>, nodes: Array<T>, level: number): void {
        if (node) {
            if (level === 1) {
                nodes.push(node.value);
            } else if (level > 1) {
                this.printLevel(node.left, nodes, level - 1);
                this.printLevel(node.right, nodes, level - 1);
            }
        }
    }
}