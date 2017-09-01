function fib(n: number): number {
    let f1 = 0;
    let f2 = 1;
    let f: number;

    do {
        f = f1 + f2;
        f1 = f2;
        f2 = f;
        n--;
    } while (n > 1);

    return f;
}

function fibRecursive(n: number): number {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }

    return fibRecursive(n - 1) * fibRecursive(n - 2);
}