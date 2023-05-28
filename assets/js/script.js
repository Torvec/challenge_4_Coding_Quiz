// START
    // TITLE 
    // INTRODUCTION
    // START QUIZ BUTTON (STARTS TIMER AND DISPLAYS FIRST QUESTION)
    // VIEW HIGH SCORES BUTTON (DISPLAYS SCOREBOARD)

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
        // IF SCORE IS GREATER THAN THE CURRENT HIGH SCORE THEN IT REPLACES THE CURRENT HIGH SCORE
        // IF SCORE IS LESS THAN THE CURRENT HIGH SCORE THEN IT IS ADDED TO THE SCOREBOARD IN THE CORRECT POSITION
        //
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
var timeLeft = 30;
var scoreValue = 0;
// Get the high score from local storage if it exists, otherwise set it to 0
var userEntries = localStorage.getItem("userEntries");
var parsedEntry = JSON.parse(userEntries);
if(!parsedEntry) {
    var hiScoreValue = 0;
} else {
    hiScoreValue = parsedEntry[0].score;
}
var quizOver = false;

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
    displayAnswers(questionNumber);
}

// Display the answers and check if the answer is correct or incorrect
function displayAnswers(questionNumber){
    for (var i = 0; i < questions[questionNumber].answers.length; i++) {
        createContent("button", "answer" + i, questions[questionNumber].answers[i]);
        var selectedAnswer = document.querySelector("#answer" + i);
        selectedAnswer.addEventListener("click", function() {
            if (this.textContent === questions[questionNumber].answers[questions[questionNumber].correctAnswer]) {
                createContent("h2", "correctMsg", "Correct!");
                addPoint();
                disableButtons();
                nextQuestion(questionNumber);
            } else {
                createContent("h2", "incorrectMsg", "Incorrect!");
                subtractTime();
                disableButtons();
                nextQuestion(questionNumber);
            }
        });
    }
}

// Disable the buttons after an answer is selected
function disableButtons(){
    var disabled = document.querySelectorAll("button");
    for (var i = 0; i < disabled.length; i++) {
        disabled[i].setAttribute("disabled", "true");
    }
};

// Load the next question or end the quiz if all questions are answered, with 1 second delay to allow the user to see the correct/incorrect messages
function nextQuestion(questionNumber){
    questionNumber++;
    if (questionNumber < questions.length) {
        setTimeout(function() {
            clearMain();
            askQuestion(questionNumber);
        }, 1000);
    } else {
        setTimeout(function() {
            clearMain();
            endQuiz();
        }, 1000);
    }
}

// Countdown function runs when the quiz starts and ends the quiz when it reaches 0 or all questions are answered
function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0 && !quizOver) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else {
            timer.textContent = 0;
            clearInterval(timeInterval);
            endQuiz();
        }
        if (quizOver) {
            clearInterval(timeInterval);
            timeLeft = 30;
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

    quizOver = true; // Set quizOver to true to prevent the timer from continuing to run
    
    createContent("h2", "endMsg", "Game Over!");
    
    createContent("p", "initialsMsg", "Enter your initials to record your score:");
    
    initials = document.createElement("input");
        initials.setAttribute("id", "initials");
        initials.setAttribute("type", "text");
        initials.setAttribute("maxlength", "2");
        initials.setAttribute("required", "true");
    main.appendChild(initials);
    
    createContent("button", "submitScoreButton", "Submit Score");
    
    submitScoreButton.addEventListener("click", function() {
        //Get the value of the input field
        var initialsInput = document.getElementById("initials").value; 
        // Convert to uppercase
        var initials = initialsInput.toUpperCase(); 
        // Create a string of the alphabet to check against
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        // Check if the initials are letters and display an alert if they are not
        for (var i = 0; i < initials.length; i++) {
            if (alphabet.indexOf(initials[i]) === -1) {
                alert("Please enter only letters A-Z");
                return;
            }
        }    
        // Store the initials and score in an object 
        var userEntry = {
            initials: initials,
            score: scoreValue}
        // Store the object in an array
        var storedEntries = localStorage.getItem("userEntries");
        var entries;
        if (storedEntries) {
            entries = JSON.parse(storedEntries);
        } else {
            entries = [];
        }
        // Push the object to the array
        entries.push(userEntry);
        localStorage.setItem("userEntries", JSON.stringify(entries));
        scoreboard();
    });    
}

// Submit Score function runs when the submit score button is clicked            
function scoreboard() {
    clearMain()
    
    var userEntries = localStorage.getItem("userEntries");
    var parsedEntry = JSON.parse(userEntries);
    
    if(!parsedEntry) {
        parsedEntry = [];
    } else {
        // Sort in descending order by score
        parsedEntry.sort(function(a, b) {
            return b.score - a.score; 
        })
    }
    
    createContent("h2", "scoreboard", "Scoreboard");
    
    createContent("ol", "scoreList", "");
    
    for(var i = 0; i < parsedEntry.length; i++){
        var scoreItem = document.createElement("li");
        scoreItem.textContent = parsedEntry[i].initials + " " + parsedEntry[i].score;
        scoreList.appendChild(scoreItem);
    }

    // Create replay button
    createContent("button", "replayBtn", "Replay");
    replayBtn.addEventListener("click", function(){
        startUp();
        timeLeft = 30;
        timer.textContent = timeLeft;
        scoreValue = 0;
        score.textContent = scoreValue;
        quizOver = false;
    });

    // Create clear scores button and confirm before clearing
    createContent("button", "clearScoresBtn", "Clear Scoreboard");
    clearScoresBtn.addEventListener("click", function(){
        if (confirm("Are you sure you want to clear the scoreboard?")){
            clearScores()
        }
        });
}

// Clear Scores from from local storage and clear the score list
function clearScores() {
    localStorage.clear();
    scoreList.innerHTML = "";
}

startUp();