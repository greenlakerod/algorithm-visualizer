import {IEnumerator} from "./enumerator";

export interface IEnumerable {
    getEnumerator: () => IEnumerator;
}