/*
Command Pattern

Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations. 

-- The Command pattern encapsulates actions as objects. Command objects allow for loosely coupled systems by separating the objects that issue a request from the objects that actually process the request. These requests are called events and the code that processes the requests are called event handlers.
-- Suppose you are building an application that supports the Cut, Copy, and Paste clipboard actions. These actions can be triggered in different ways throughout the app: by a menu system, a context menu (e.g. by right clicking on a textbox), or by a keyboard shortcut.
-- Command objects allow you to centralize the processing of these actions, one for each operation. So, you need only one Command for processing all Cut requests, one for all Copy requests, and one for all Paste requests.
-- Because commands centralize all processing, they are also frequently involved in handling Undo functionality for the entire application.

The objects participating in this pattern are:
-- Client: references the Receiver object -- In sample code: the run() function
-- Receiver: knows how to carry out the operation associated with the command, (optionally) maintains a history of executed commands -- In sample code: Calculator
-- Command: maintains information about the action to be taken -- In sample code: Command
-- Invoker: asks to carry out the request -- In our sample code: the user pushing the buttons
*/

//Sample
function add(x: number, y: number) { return x + y; }
function sub(x: number, y: number) { return x - y; }
function mul(x: number, y: number) { return x * y; }
function div(x: number, y: number) { return x / y; }

// var log = (function () {
//     var log = "";
//     return {
//         add: function (msg) { log += msg + "\n"; },
//         show: function () { console.log(log); log = ""; }
//     }
// })();
class Log {
    static log: string = "";
    static add(msg: string) { this.log += msg + "\n"; }
    static show() { 
        console.log(this.log); //alert(this.log);
        this.log = "";
    }
}

// //command
// var Command = function(execute, undo, value) {
//     this.execute = execute;
//     this.undo = undo;
//     this.value = value;
// };
class Command {
    constructor(public execute: (x: number, y: number) => number,
                public undo: (x: number, y: number) => number,
                public value: number ) {
    }
}

// var AddCommand = function(value) {
//     return new Command(add, sub, value);
// };
class AddCommand extends Command {
    constructor(value: number) {
        super(add, sub, value);
    }
}

// var SubCommand = function(value) {
//     return new Command(sub, add, value);
// };
class SubCommand extends Command {
    constructor(value: number) {
        super(sub, add, value);
    }
}

// var MulCommand = function(value) {
//     return new Command(mul, div, value);
// };
class MulCommand extends Command {
    constructor(value: number) {
        super(mul, div, value);
    }
}

// var DivCommand = function(value) {
//     return new Command(div, mul, value);
// };
class DivCommand extends Command {
    constructor(value: number) {
        super(div, mul, value);
    }
}

// //receiver
// var Calculator = function() {
//     var current = 0;
//     var commands = [];

//     function action(command) {
//         var name = command.execute.toString().substr(9, 3);
//         return name.charAt(0).toUpperCase() + name.slice(1);
//     }

//     return {
//         execute: function(command) {
//             current = command.execute(current, command.value);
//             commands.push(command);
//             log.add(action(command) + ": " + command.value);
//         },
//         undo: function() {
//             var command = commands.pop();
//             current = command.undo(current, command.value);
//             log.add("Undo " + action(command) + ": " + command.value);
//         },
//         getCurrentValue: function() {
//             return current;
//         }
//     };
// };
class Calculator {
    private current = 0;
    private commands: Array<Command> = [];

    public execute(command: Command) {
        this.current = command.execute(this.current, command.value);
        this.commands.push(command);
        Log.add(`${this.action(command)}: ${command.value}`);
    }

    public undo() {
        let command = this.commands.pop();
        let current = command.undo(this.current, command.value);
        Log.add(`Undo ${this.action(command)}: ${command.value}`);
    }

    public getCurrentValue(): number {
        return this.current;
    }

    private action(command: Command) {
        let name = command.execute.toString().substr(9, 3);
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

}

//client
(function run() {
    let calculator = new Calculator();

    //----------------- invoker (represents the user)
    // issue commands
    calculator.execute(new AddCommand(100));
    calculator.execute(new SubCommand(24));
    Log.add("Value: " + calculator.getCurrentValue());
    calculator.execute(new MulCommand(6));
    Log.add("Value: " + calculator.getCurrentValue());
    calculator.execute(new DivCommand(2));
    Log.add("Value: " + calculator.getCurrentValue());

    //undo
    calculator.undo();
    Log.add("Value: " + calculator.getCurrentValue());

    //undo
    calculator.undo();
    Log.add("Value: " + calculator.getCurrentValue());
    //----------------- invoker -end

    Log.show();
})();