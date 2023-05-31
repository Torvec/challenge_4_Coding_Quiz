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
            "Checks for equality of the values",
            "Checks for equality of the values and data types",
            "Assigns a value to a variable",
            "Compares two values and returns true if they are the same type"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the scope of a variable with the 'var' keyword?",
        answers: [
            "Global scope",
            "Function Scope or Module Scope",
            "Block scope or Local Scope",
            "Function scope or Global Scope"
        ],
        correctAnswer: 3
    },
    {
        question: "What does the setTimeout() function do in JavaScript?",
        answers: [
            "Pauses the execution of the program for a specified amount of time",
            "Executes a function after a specified amount of time has passed",
            "Sets an interval to repeatedly execute a function",
            "Halts the function execution indefinitely"
        ],
        correctAnswer: 1
    },
    {
        question: "What is the official name of JavaScript?",
        answers: [
            "ActionScript",
            "TYpeScript",
            "CoffeeScript",
            "ECMAScript"
        ],
        correctAnswer: 3
    },
    {
        question: "Which of the following will increase a value by 2?",
        answers: [
            "x++",
            "x *= 2",
            "x += 2",
            "x += 2x"
        ],
        correctAnswer: 2
    },
    {
        question: "What type of loop will continue to iterate so long as the set condition is true?",
        answers: [
            "do...while",
            "For...In",
            "while",
            "for"
        ],
        correctAnswer: 2
    },
    {
        question: "Which of the following statements about the setInterval function in JavaScript is true?",
        answers: [
            "It executes a function repeatedly at a specified interval.",
            "It executes a function only once after a specified delay",
            "It pauses the execution of a function for a specified duration.",
            "It sets a timeout for a function to be executed after a specific time."
        ],
        correctAnswer: 0
    },
    {
        question: "What would the value of x be after this while loop completed: var x = 1; while(x <= 9000) { x += 2; }",
        answers: [
            "9002",
            "9000",
            "9001",
            "Over 9000"
        ],
        correctAnswer: 3
    }
];