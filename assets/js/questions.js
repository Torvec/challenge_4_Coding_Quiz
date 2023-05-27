// Storing the content of the quiz in an array of objects
var questions = [
    {
        question: "What is the output of the following code? console.log(typeof([]))",
        answers: [
            "object",
            "array",
            "undefined",
            "null"
        ],
        correctAnswer: 0
    },
    {
        question: "What is the correct way to check if a variable 'x' is an array in JavaScript?",
        answers: [
            "Array.isArray(x)",
            "x.isArray()",
            "typeof(x) === 'array'",
            "x instanceof Array"
        ],
        correctAnswer: 0
    },
    {
        question: "What does the '===' operator do in JavaScript?",
        answers: [
            "Checks for equality of values",
            "Checks for equality of values and types",
            "Assigns a value to a variable",
            "Compare two variables lexicographically"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the scope of a variable with the 'var' keyword?",
        answers: [
            "Global scope",
            "Local scope",
            "Block scope",
            "Function scope"
        ],
        correctAnswer: 3
    },
    {
        question: "What does the setTimeout() function do in JavaScript?",
        answers: [
            "Pauses the execution of the program for a specified amount of time",
            "Executes a function after a specified amount of time has passed",
            "Sets an interval to repeatedly execute a function",
            "Halts the program execution indefinitely"
        ],
        correctAnswer: 1
    }
];