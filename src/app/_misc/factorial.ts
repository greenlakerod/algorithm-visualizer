//non-tail recursive
function factorial_nonTail(x: number): number {
    if (x <= 0) {
        return 1;
    } else {
        return x * factorial_nonTail(x - 1);
    }
}


//tail recursive
function factorial_tail(n: number): number {
    return factorial_tail2(n, 1);
}

function factorial_tail2(n: number, m: number): number {
    if (n <= 1) {
        return m;
    } else {
        return factorial_tail2(n - 1, n * m);
    }
}