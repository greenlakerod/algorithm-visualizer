import {Component, OnInit} from "@angular/core";
import {IStack} from "./stack";
import {ArrayStack} from "./array-stack";
import {LinkedListStack} from "./linked-list-stack";

@Component({
    selector: "stack",
    styleUrls: ["./stack.component.css"],
    templateUrl: "./stack.component.html"
})
export class StackComponent implements OnInit {
    private _stack: IStack;
    public get stack(): IStack { return this._stack; }

    public get count(): number { return this._stack.size; }

    public ngOnInit(): void {
        this.setType();
    }

    public push(item: any): void {}
    public pop(): any {}
    public peek(): any {}
    public clear(): void {}

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