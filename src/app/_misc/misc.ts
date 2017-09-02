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

//given a number, give the string representation of the number
//e.g 100,715 -> "One Hundred Thousand Seven Hundred Fifteen"

//given an array representation of a binary tree in inorder traversal, rebuild the binary tree

//determine if two rectangles overlap

//given a "regular exression pattern", determine if an input string matches that pattern
//pattern: 
// a-zA-Z0-9 (e.g. "a" matches "a")
// " " matches " "
// "." matches any one character (e.g. "a", "b", "1"). "a.b" matches "aab", "a1b". does not match "aazb"
// "*" matches all characters, an indefinite amount of them
 