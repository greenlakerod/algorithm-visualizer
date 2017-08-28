import {ISortAlgorithm} from "./sort";
import {BubbleSort} from "./bubble-sort";
import {InsertionSort} from "./insertion-sort";
import {MergeSort} from "./merge-sort";
import {QuickSort} from "./quick-sort";
import {SelectionSort} from "./selection-sort";
import {HeapSort} from "./heap-sort";

export class SortAlgorithmFactory {
    private static _algorithmList: Array<{ name: string; type: ISortAlgorithm; }> = [
        { name: "bubble", type: new BubbleSort() },
        { name: "heap", type: new HeapSort() },
        { name: "insertion", type: new InsertionSort() },
        { name: "merge", type: new MergeSort() },
        { name: "quick", type: new QuickSort() },
        { name: "selection", type: new SelectionSort() }
    ];

    public static initialize(): void {
        let self = this;
        this._algorithmList.forEach((a) => {
            self[a.name] = a.type;
        });
    }

    public static get options(): Array<{ name: string; label: string; }> {
        return [
            { name: "bubble", label: "Bubble Sort" },
            { name: "heap", label: "Heap Sort" },
            { name: "insertion", label: "Insertion Sort" },
            { name: "merge", label: "Merge Sort" },
            { name: "quick", label: "Quick Sort" },
            { name: "selection", label: "Selection Sort" }
        ];
    }
}