import {Component, OnInit} from "@angular/core";
import {IStack} from "./stack";
import {ArrayStack} from "./array-stack";
import {LinkedListStack} from "./linked-list-stack";

@Component({
    selector: "stack",
    styleUrls: ["../../data-structure.css", "./stack.component.css"],
    templateUrl: "./stack.component.html"
})
export class StackComponent implements OnInit {
    public poppedItem: any;
    public peekedItem: any;

    private _stack: IStack;
    public get stack(): IStack { return this._stack; }

    public get count(): number { return this._stack.size; }

    public ngOnInit(): void {
        this.setType();
    }

    public push(item: any): void {
        if (item !== undefined && item !== "") {
            this._stack.push(item);
        }
    }
    public pop(): any {
        try {
            this.poppedItem = this._stack.pop();
        } catch (error) {
            alert(error.message || error);
        }
    }
    public peek(): any {
        try {
            this.peekedItem = this._stack.peek();
        } catch (error) {
            alert(error.message || error);
        }       
    }
    public clear(): void {
        this._stack.clear();
    }

    public setType(stackType: string = "linkedlist", valueType: string = "number"): void {
        if (this._stack) {
            this._stack.clear();
        }

        switch (valueType) {
            case "string":
                this._stack = stackType === "linkedlist" ? new LinkedListStack<string>() : new ArrayStack<string>();
                break;
            case "number":
                this._stack = stackType === "linkedlist" ? new LinkedListStack<number>() : new ArrayStack<number>();
                break;
            default:
                break;
        }
    }
}