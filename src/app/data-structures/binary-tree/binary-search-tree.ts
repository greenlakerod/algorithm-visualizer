/// <reference path="../../../../node_modules/@types/bootstrap-treeview/index.d.ts" />

import {BinaryTree} from "./binary-tree";
import {BinaryTreeNode} from "./binary-tree-node";
import {LinkedListStack} from "../stack/linked-list-stack";

export class BinarySearchTree<T> extends BinaryTree<T> {
    public add(value: T): void {
        let node: BinaryTreeNode<T> = new BinaryTreeNode<T>(value);
        if (!this._root) {
            this._root = node;
        } else {
            this._addNode(node, this._root);
        }

        this._count++;

        this._treeView = [BinaryTreeNode.convertToTreeViewNode(this._root)];
        console.log(JSON.stringify(this._root));
    }
    public find(value: T): BinaryTreeNode<T> {
        let parent: { node?: BinaryTreeNode<T>, relationship?: string } = {};
        return this._findNode(value, this._root, parent);
    }
    public remove(value: T): void {
        let parent: { node?: BinaryTreeNode<T>, relationship?: string } = {};
        let node: BinaryTreeNode<T> = this._findNode(value, this._root, parent);

        if (node) {
            //let nodePtr: { node?: BinaryTreeNode<T> } = { node: node };
            //this.removeNode(nodePtr, parent);

            let childCount = 0;
            if (node.left) { childCount++; }
            if (node.right) { childCount++; }
    
            if (childCount === 0) {
                node = null;
            } else {
                if (childCount === 1) {
                    if (node.right) {
                        node = node.right;
                    } else {
                        node = node.left;
                    }
                } else { //two children
                    let min = this._findMinValueNode(node.right);
                    if (min !== node.right) {
                        if (min.right) {
                            let r = min.right;
                            while (r.right) {
                                r = r.right;
                            }
                            
                            r.right = node.right;
                        } else {
                            min.right = node.right;
                        }
                    }
                    min.left = node.left;                    
    
                    node = min;
                    min = null;
                }
            }

            if (!parent.node) { //found the root
                this._root = node;
            } else {
                if (parent.relationship === "left") {
                    parent.node.left = node;
                } else {
                    parent.node.right = node;
                }
            }
        }

        this._count--;

        this._treeView = [BinaryTreeNode.convertToTreeViewNode(this._root)];
        console.log(JSON.stringify(this._root));
    }
    public buildTree(order: "inorder" | "preorder" | "postorder", nodes: Array<T>, levelOrderNodes?: Array<T>): void {
        this.clear();
    }

    protected _addNode(newNode: BinaryTreeNode<T>, root: BinaryTreeNode<T>): void {
        if (parseInt(newNode.value.toString()) < parseInt(root.value.toString())) {
            if (!root.left) {  //if (root.left == null || !root.left) {
                root.left = newNode;
            } else {
                this._addNode(newNode, root.left);
            }
        } else {
            if (!root.right) { //if (root.right == null || !root.right) {
                root.right = newNode;
            } else {
                this._addNode(newNode, root.right);
            }
        }
    }
    protected _findNode(value: T, current: BinaryTreeNode<T>, parent: { node?: BinaryTreeNode<T>, relationship?: string }): BinaryTreeNode<T> {
        if (!current) { return null; }
        // if (current == null || !current) {
        //     return null;
        // }

        let c: number = parseInt(current.value.toString());
        let v: number = parseInt(value.toString());

        if (c === v) {
            return current;
        } else if (v < c) {
            parent.node = current;
            parent.relationship = "left";
            return this._findNode(value, current.left, parent);
        } else {
            parent.node = current;
            parent.relationship = "right";
            return this._findNode(value, current.right, parent);
        }
    }
    protected _findMinValueNode(current: BinaryTreeNode<T>): BinaryTreeNode<T> {
        if (!current) {
            return null;
        }

        let left = this._findMinValueNode(current.left);
        if (left) {
            return left;
        }

        return current;
    }
    protected _removeNode(nodePtr: { node?: BinaryTreeNode<T> }, parent: { node?: BinaryTreeNode<T>, relationship?: string }): void {
        let node = nodePtr.node;

        let childCount = 0;
        if (node.left) { childCount++; }
        if (node.right) { childCount++; }

        if (childCount === 0) {
            node = null;
        } else {
            if (childCount === 1) {
                if (node.right) {
                    node = node.right;
                } else {
                    node = node.left;
                }
            } else { //two children
                let min = this._findMinValueNode(node.right);
                if (min !== node.right) {
                    if (min.right) {
                        let r = min.right;
                        while (r.right) {
                            r = r.right;
                        }
                        
                        r.right = node.right;
                    } else {
                        min.right = node.right;
                    }
                }
                min.left = node.left;                    

                node = min;
                min = null;
            }
        }

        nodePtr.node = node;
    }

    private _buildTreePostorder(nodes: Array<T>): void {
        if (nodes && nodes.length > 0) {
            for (let i = nodes.length - 1; i >= 0; i--) {
                this.add(nodes[i]);
            }   
        }
    }
    private _buildTreePreorder(nodes: Array<T>): void {
        if (nodes && nodes.length > 0) {
            let stack: LinkedListStack<BinaryTreeNode<T>> = new LinkedListStack<BinaryTreeNode<T>>();
            
            for (let i = 0; i < nodes.length; i++) {
                let n = new BinaryTreeNode<T>(nodes[i]);
                if (i === 0) {
                    this._root = n;
                } else {
                    let top = stack.peek();
                    if (top) {
                        if (top.value > n.value) {
                            top.left = n;
                            stack.push(n);
                        } else {
                            let popped = stack.pop();
                            top = stack.peek();
                            while (top && top.value < n.value) {
                                popped = stack.pop();
                                top = stack.peek();
                            }
                            popped.right = n;
                        }
                    }
                }

                if (i < nodes.length - 1) {
                    stack.push(n);
                }
            }
        }
    }

    /*
                20
              /     \
            8        22
          /   \
         4     12
              /  \
            10    14

    initial arrays:
    in[] = {4, 8, 10, 12, 14, 20, 22};
    level[] = {20, 8, 22, 4, 12, 10, 14};

             20
           /    \
          /      \ 
    {4,8,10,12,14}  {22}  

    for left tree:
    In[]    = {4, 8, 10, 12, 14}
    level[] = {8, 4, 12, 10, 14} 

    right tree:
    In[]    = {22}
    level[] = {22} 
    */
    private _buildTreeInorder(nodes: Array<T>, levelOrderNodes: Array<T>): void {
        this._root = this._buildInorderLevelOrderTree(nodes, levelOrderNodes, 0, nodes.length - 1);
    }
    private _buildInorderLevelOrderTree(nodes: Array<T>, levelOrderNodes: Array<T>, start: number, end: number): BinaryTreeNode<T> {
        //If start index is more than the end index
        if (start > end) {
            return null;
        }
        //The first node in level order traversal is root
        let root: BinaryTreeNode<T> = new BinaryTreeNode<T>(levelOrderNodes[0]);

        //If this node has no children then return
        if (start != end) {
            //index of root in Inorder traversal
            let inorderIndex = nodes.slice(start, end).indexOf(root.value);

            //left subtree
            let leftLevelNodes = this._buildLevelOrderArray(nodes, levelOrderNodes, inorderIndex);

            //right subtree
            let rightLevelNodes = this._buildLevelOrderArray(nodes.slice(inorderIndex + 1), levelOrderNodes, levelOrderNodes.length - inorderIndex - 1);

            root.left = this._buildInorderLevelOrderTree(nodes, leftLevelNodes, start, inorderIndex - 1);
            root.right = this._buildInorderLevelOrderTree(nodes, rightLevelNodes, inorderIndex + 1, end);
        }

        return root;
    }
    private _buildLevelOrderArray(nodes: Array<T>, levelOrderNodes: Array<T>, end: number): Array<T> {
        let newLevel: Array<T> = [];
        for (let i = 0; i < levelOrderNodes.length; i++) {
            if (nodes.slice(0, end - 1).indexOf(levelOrderNodes[i]) >= 0) {
                newLevel.push(levelOrderNodes[i]);
            }
        }

        return newLevel;
    }
}