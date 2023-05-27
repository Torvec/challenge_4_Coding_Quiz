// START
    // TITLE 
    // INTRODUCTION
    // START QUIZ BUTTON (STARTS TIMER AND DISPLAYS FIRST QUESTION)
    // VIEW HIGH SCORES BUTTON (DISPLAYS HIGH SCORES SCREEN)

// QUESTIONS
    // LOAD ONE QUESTION AT A TIME WITH CORRESPONDING ANSWERS FROM ARRAY IN QUESTIONS.JS
    // WHEN USER SELECTS AN ANSWER IT WILL DISPLAY IF IT WAS CORRECT OR INCORRECT FOR A FEW SECONDS AND THEN LOAD THE NEXT QUESTION
    // IF ANSWER IS CORRECT, SCORE INCREASES
    // IF ANSWER IS INCORRECT, TIME IS SUBTRACTED FROM THE TIMER
    // WHEN AN ANSWER IS SELECTED ALL OF THE BUTTONS NEED TO BE DISABLED UNTIL THE NEXT QUESTION IS LOADED

// GAME OVER
    // GAME OVER MESSAGE
    // FINAL SCORE
    // ENTER INITIALS MESSAGE
    // INITIALS INPUT
    // SUBMIT SCORE BUTTON (SAVES SCORE TO LOCAL STORAGE AND DISPLAYS HIGH SCORES SCREEN)

// SCOREBOARD
    // DISPLAYS TOP 10 SCORES WITH INITIALS (TAKEN FROM LOCAL STORAGE)
        // IF THERE ARE LESS THAN 10 SCORES THEN IT WILL FILL IN THE BLANKS WITH BLANK INITIALS AND 0 SCORE
        // SCORES ARE DISPLAYED IN DESCENDING ORDER FROM HIGHEST TO LOWEST
    // CLEAR HIGH SCORES BUTTON (REMOVES ALL SCORES FROM LOCAL STORAGE)
    // BACK TO START BUTTON (TAKES YOU BACK TO THE START SCREEN)

// SCORE KEEPING FUNCTIONALITY
    // INCREASES FOR EVERY CORRECT ANSWER
    // SCORE SAVED IN LOCAL STORAGE
    // SCORE RESETS WHEN GAME IS RESTARTED

// TIMER COUNTDOWN FUNCTIONALITY
    // CONSTANTLY DECREASES BY 1 SEC
    // IF USER GETS A QUESTION INCORRECT THEN TIME IS SUBTRACTED
    // TIMER RESETS WHEN GAME IS RESTARTED

// Declaring Global Variables
var main = document.querySelector("main");
var score = document.getElementById("scoreValue");
var timer = document.getElementById("timerValue");
var hiScore = document.getElementById("hiScoreValue");
var timeLeft = 10;
var scoreValue = 0;
var hiScoreValue = 0;

// Clears the main element
function clearMain() {
    main.innerHTML = "";
}

//Create an element and append it to the main element
function createContent(element, id, textContent) {
    var element = document.createElement(element);
        element.setAttribute("id", id);
        element.textContent = textContent;
    main.appendChild(element);
}

// StartUp function runs when the page is loaded or when the game is restarted
function startUp() {
    clearMain();
    createContent("h1", "title", "JavaScript Quiz");
    createContent("p", "description", "Welcome to the JavaScript Multiple Choice Quiz! In this timed game, you'll test your knowledge of JavaScript. Each correct answer will earn you 1 point, while an incorrect answer will deduct 5 seconds from the remaining time. The game will end when either all questions are answered or the timer reaches 0. Good luck and have fun!");
    createContent("button", "startButton", "Start Quiz");
    createContent("button", "viewScoresButton", "View High Scores");
    startButton.addEventListener("click", function() {
        askQuestion(0);
        countdown();
    });
    viewScoresButton.addEventListener("click", scoreboard);
    // Set initial values
    score.textContent = scoreValue;
    timer.textContent = timeLeft;
    hiScore.textContent = hiScoreValue;
}

// Ask the question and display the answers
function askQuestion(questionNumber) {
    clearMain();
    createContent("h2", "question", questions[questionNumber].question);
    createAnswers(questionNumber);

    checkAnswer(questionNumber);
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
    var selectedAnswer = document.getElementById("answer" + i);
    if (question[questionNumber].answers[correctAnswer] === question[questionNumber].answers[questionNumber]) {
        addPoint();
    }
}

function nextQuestion(questionNumber) {
    clearMain()
    askQuestion(questionNumber);
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
    clearMain()
    createContent("h2", "endMsg", "Game Over!");
    createContent("p", "initialsMsg", "Enter your initials to record your score:");
    initials = document.createElement("input");
        initials.setAttribute("id", "initials");
        initials.setAttribute("type", "text");
        initials.setAttribute("maxlength", "2");
        initials.setAttribute("required", "true");
    main.appendChild(initials);
    createContent("button", "submitScoreButton", "Submit Score");
    submitScoreButton.addEventListener("click", submitScore);    
}

function submitScore() {
    var initials = document.getElementById("initials");
    var initialsValue = initials.value;
    localStorage.setItem("initials", initialsValue);
    localStorage.setItem("score", scoreValue);
}

// Submit Score function runs when the submit score button is clicked
function scoreboard(){
        
    clearMain()

    //Creates Top 10 Scores Message
    createContent("h2", "scoreMsg", "High Scores");
    
    //Creates the list of scores
    var scoreList = document.createElement("ol");
        scoreList.setAttribute("id", "scoreList");
    var scoreItem = [];
    for (var i = 0; i < 10; i++) {
        scoreItem[i] = document.createElement("li");
        scoreItem[i].setAttribute("id", "scoreItem" + i);
        scoreItem[i].textContent = "Initials: " + localStorage.getItem("initials" + i) + " Score: " + localStorage.getItem("score" + i);
        scoreList.appendChild(scoreItem[i]);
    }
    main.appendChild(scoreList);

    //Creates replay button
    createContent("button", "replayBtn", "Replay");
    replayBtn.addEventListener("click", startUp);

    //Creates clear scores button
    createContent("button", "clearScoresBtn", "Clear Scoreboard");
    clearScoresBtn.addEventListener("click", clearScores);
}

// Clear Scores from from local storage
function clearScores() {
    localStorage.clear();//Clears the local storage
    scoreList.innerHTML = ""; //Clears the score list
}

startUp();