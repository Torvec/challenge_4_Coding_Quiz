// START SCREEN
    // START BUTTON -> USER PRESSES IT -> BUTTON DISAPPEARS AND THE FIRST QUESTION AND ANSWER CHOICES DISPLAYS -> TIMER STARTS

// TIMER COUNTDOWN FROM A SET TIME (LENGTH DETERMINED BY USER?)
    // CONSTANTLY DECREASES BY 1 SEC
    // IF USER GETS A QUESTION INCORRECT THEN TIME IS SUBTRACTED

// MULTIPLE CHOICE QUESTIONS
    // RANDOMIZED ORDER OF QUESTIONS
        // NEED TO MAKE SURE QUESTION ISN'T ASKED AGAIN AFTER IT IS ANSWERED
    // RANDOMIZED ORDER OF ANSWERS
    // IF ANSWER IS CORRECT, SOME INDICATION THAT IT IS CORRECT
    // IF ANSWER IS INCORRECT, SOME INDICATION THAT IT IS INCORRECT
        // DOES NOT SHOW CORRECT ANSWER IF THEY GOT IT WRONG
    // WHEN USER SELECTS AN ANSWER IT WILL DISPLAY IF IT WAS CORRECT OR INCORRECT FOR A FEW SECONDS AND THE TIMER WILL BE PAUSED BEFORE THE NEXT QUESTION DISPLAYS
    // MAKE ALL ANSWER CHOICES BUTTONS

// SCORE KEEPING
    // INCREASES FOR EVERY CORRECT ANSWER
    // HIGHEST SCORE STAYS DISPLAYED FOR ENTIRE TIME THE QUIZ IS BEING DONE, DOES NOT SAVE IF YOU LEAVE AND COME BACK

// GAME OVER SCREEN
    // DISPLAY FINAL SCORE AND ALLOW USER TO ENTER INITIALS
    // HAS A BUTTON TO REPLAY WHICH TAKES YOU BACK TO THE START SCREEN


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

// Tile screen content
var title = "JavaScript Quiz";
var introduction = "Welcome to the JavaScript Multiple Choice Quiz! In this timed game, you'll test your knowledge of JavaScript. Each correct answer will earn you 1 point, while an incorrect answer will deduct 5 seconds from the remaining time. The game will end when either all questions are answered or the timer reaches 0. Good luck and have fun!";

// Declaring Global Variables
var main = document.querySelector("main");
var score = document.getElementById("scoreValue");
var timer = document.getElementById("timerValue");
var hiScore = document.getElementById("hiScoreValue");
var timeLeft = 30;
var scoreValue = 0;
var hiScoreValue = 0;

// StartUp function runs when the page is loaded or when the game is restarted
function startUp() {
    //Create the title
    var titleEl = document.createElement("h1");
        titleEl.setAttribute("id", "title");
        titleEl.textContent = title;
    main.appendChild(titleEl);
    //Create the introduction
    var introEl = document.createElement("p");
        introEl.setAttribute("id", "description");
        introEl.textContent = introduction;
    main.appendChild(introEl);
    //Create the start button
    var startBtn = document.createElement("button");
        startBtn.setAttribute("id", "startButton");
        startBtn.textContent = "Start Quiz";
    main.appendChild(startBtn);
    startBtn.addEventListener("click", startQuiz);
    // Set initial values
    score.textContent = scoreValue;
    timer.textContent = timeLeft;
    hiScore.textContent = hiScoreValue;
}

// StartQuiz function runs when the start button is clicked
function startQuiz() {
    //Remove the start screen
    main.innerHTML = ""; //Removes all child elements
    createQuestion(0);
    createAnswers(0);
    countdown();
}

//Create the question
function createQuestion(questionNumber){
    var question = document.createElement("h2");
    question.setAttribute("id", "question");
    question.textContent = questions[questionNumber].question;
    main.appendChild(question);
}

//Create the answers
function createAnswers(questionNumber){
    for (var i = 0; i < questions[questionNumber].answers.length; i++) {
        var answer = document.createElement("button");
        answer.setAttribute("id", "answer" + i);
        answer.textContent = questions[questionNumber].answers[i];
        main.appendChild(answer);
    }
}

//Check if the answer is correct or incorrect
function checkAnswer(questionNumber) {
    var answer0 = document.getElementById("answer0");
    var answer1 = document.getElementById("answer1");
    var answer2 = document.getElementById("answer2");
    var answer3 = document.getElementById("answer3");
    
    /*if( ){
        var correctMsg = main.createElement("p");
        correctMsg.setAttribute("id", "correctMsg");
        correctMsg.textContent = "Correct!";
        addPoint();
        nextQuestion();
    } else {
        var incorrectMsg = main.createElement("p");
        incorrectMsg.setAttribute("id", "incorrectMsg");
        incorrectMsg.textContent = "Incorrect!";
        subtractTime();
        nextQuestion();
    }*/
}

function nextQuestion(questionNumber) {
    main.removeChildren();
    createQuestion(questionNumber);
    createAnswers(questionNumber);
}

// Countdown function runs when the quiz starts and ends the quiz when it reaches 0
function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else {
            timer.textContent = 0;
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
}

// Adds a point to the score when the correct answer is made
function addPoint() {
    scoreValue++;
    score.textContent = scoreValue;
}

// Subtracts 5 seconds from the timer when the incorrect answer is made
function subtractTime() {
    timeLeft -= 5;
    timer.textContent = timeLeft;
}

// EndQuiz function runs when the timer reaches 0 or all questions are answered
function endQuiz() {
    main.removeChildren();
    //Game Over Message
    var endMsg = document.createElement("h2");
        endMsg.setAttribute("id", "endMsg");
        endMsg.textContent = "Game Over!";
    main.appendChild(endMsg);
    //Initials Message
    var initialsMsg = document.createElement("p");
        initialsMsg.setAttribute("id", "initialsMsg");
        initialsMsg.textContent = "Enter your initials to record your score:";
    main.appendChild(initialsMsg);
   //Initials Input
    var initials = document.createElement("input");
        initials.setAttribute("id", "initials");
        initials.setAttribute("type", "text");
        initials.setAttribute("maxlength", "2");
        initials.setAttribute("required", "true");
    main.appendChild(initials);
    //Submit Score Button
    var submitBtn = document.createElement("button");
        submitBtn.setAttribute("id", "submitBtn");
        submitBtn.textContent = "Submit Score";
    main.appendChild(submitBtn);
    submitBtn.addEventListener("click", submitScore);
}

function submitScore(){
    //var initials = document.getElementById("initials");
    //var initialsValue = initials.value;
    //localStorage.setItem("initials", initialsValue);
    //localStorage.setItem("score", scoreValue);
    main.removeChildren();
    
    var scoreMsg = document.createElement("h2");
    scoreMsg.setAttribute("id", "scoreMsg");
    scoreMsg.textContent = "Top 10 Scores";
    main.appendChild(scoreMsg);
    
    var scoreList = document.createElement("ol");
    scoreList.setAttribute("id", "scoreList");
    main.appendChild(scoreList);


    
    var replayBtn = document.createElement("button");
    replayBtn.setAttribute("id", "replayBtn");
    replayBtn.textContent = "Replay";
    main.appendChild(replayBtn);
    replayBtn.addEventListener("click", startUp);
    
    var clearScoresBtn = document.createElement("button");
    clearScoresBtn.setAttribute("id", "clearScoresBtn");
    clearScoresBtn.textContent = "Clear High Scores";
    main.appendChild(clearScoresBtn);
    clearScoresBtn.addEventListener("click", clearScores);
}

startUp();