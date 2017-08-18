export interface IEnumerator {
    current: any;
    moveNext: () => boolean;
    reset: () => void;
}