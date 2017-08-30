export enum HeapType {
    MinHeap,
    MaxHeap
}
export interface IHeap {
    heapType: HeapType;
    capacity: number;
    getItems: () => any;
}

export abstract class Heap implements IHeap {
    protected _heapType: HeapType = HeapType.MaxHeap;
    protected _capacity: number;

    public get heapType(): HeapType { return this._heapType; }
    public get capacity(): number { return this._capacity; }

    constructor(heapType: HeapType, capacity: number) {
        this._heapType = heapType;
        this._capacity = capacity;
    }

    public abstract getItems(): any;
}