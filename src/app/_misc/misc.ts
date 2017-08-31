//given an array of numbers, determine if there is a pair of numbers
//within the array that sums up to another given number
function hasPairEqualToSum(data: Array<number>, sum: number) {
    let set = new Set();
    for (let i = 0; i < data.length; i++) {
        let complement = sum - data[i];
        if (set.has(complement)) {
            return true;
        }
        set.add(complement);
    }

    return false;
}