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
//"One Hundred 1 Thousand Seven Hundred undefinedteen"
function toString(numString: string): string {
    let value: string = "";
    let digits = {
        "0": "Zero",
        "1": "One",
        "2": "Two",
        "3": "Three",
        "4": "Four",
        "5": "Five",
        "6": "Six", 
        "7": "Seven",
        "8": "Eight",
        "9": "Nine"
    };
    let tens = {
        "0": "Zero",
        "1": "Ten",
        "2": "Twenty",
        "3": "Thirty",
        "4": "Forty",
        "5": "Fifty",
        "6": "Sixty",
        "7": "Seventy",
        "8": "Eighty",
        "9": "Ninety"
    };
    let powers = {
        "1": "Thousand",  
        "2": "Million",
        "3": "Billion",
        "4": "Trillion"
    };

    let chunks = numString.split(",");
    for (let i = 0; i < chunks.length; i++) {
        let chunk = chunks[i];
        if ((chunk.length > 3) || (chunks.length > 1 && i > 1 && chunk.length < 3)) {
            throw "Invalid number";
        }

        while (chunk.length < 3) {
            chunk = "0" + chunk;
        }
        
        let chunkAsString = "";
        let hundred = digits[chunk[0]];
        let ten = tens[chunk[1]];
        let one = digits[chunk[2]];

        if (hundred != "Zero") {
            chunkAsString = hundred + " Hundred";
        }
        if (ten != "Zero") {
            if (ten == "Ten") {
                if (one != "Zero") {
                    if (one == "One") {
                        chunkAsString += " Eleven";
                    } else if (one == "Two") {
                        chunkAsString += " Twelve";
                    } else if (one == "Three") {
                        chunkAsString += " Thirteen";
                    } else if (one == "Five") {
                        chunkAsString += " Fifteen";
                    } else {
                        one += "teen";
                        chunkAsString += " " + one;
                    }
                }
            } else {
                chunkAsString += " " + ten + " " + one;
            }
        } else {
            if (one != "Zero") {
                chunkAsString += " " + one;
            } else if (hundred == "Zero") {
                chunkAsString += " Zero";
            }
        }

        if (i < chunks.length - 1) {
            chunkAsString += " " + powers[chunks.length - 1 - i];
        }

        value += " " + chunkAsString;
    }

    return value.trim();
}

//given an array representation of a binary tree in inorder traversal, rebuild the binary tree

//determine if two rectangles overlap
//assume positive x and y axis
class Point {
    constructor(public x: number, public y: number) {}
}

class Rectangle {
    static overlaps(r1: Rectangle, r2: Rectangle): boolean {

        // If one rectangle is on left side of other
        if (r1.lowerRight.x < r2.upperLeft.x || r2.lowerRight.x < r1.upperLeft.x) {
            return false;
        }

        // If one rectangle is above other
        if (r1.lowerRight.y < r2.upperLeft.y || r2.lowerRight.y < r1.upperLeft.y) {
            return false;
        }
        
        return true;
    }

    constructor(public upperLeft: Point, public lowerRight: Point) {}
}


//given a "regular exression pattern", determine if an input string matches that pattern
//pattern: 
// a-zA-Z0-9 (e.g. "a" matches "a")
// " " matches " "
// "." matches any one character (e.g. "a", "b", "1"). "a.b" matches "aab", "a1b". does not match "aazb"
// "*" matches all characters, an indefinite amount of them
 