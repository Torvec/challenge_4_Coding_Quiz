// Created by Edward Von Schondorf on May 2023

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
    parsedEntry.sort(function(a, b) {
        return b.score - a.score; 
    });
    hiScoreValue = parsedEntry[0].score;
}

// Clears the main element
function clearMain() {
    main.innerHTML = "";
}

// StartUp function runs when the page is loaded or when the game is restarted
function startUp() {
    // Create the title
    var javascriptQuizTitle = document.createElement("h1");
        javascriptQuizTitle.textContent = "JavaScript Quiz";
        main.appendChild(javascriptQuizTitle);
    // Create the introduction
    var introduction = document.createElement("p");
        introduction.textContent = "Welcome to the JavaScript Multiple Choice Quiz! In this timed game, you'll test your knowledge of JavaScript. Each correct answer will earn you 1 point, while an incorrect answer will deduct 5 seconds from the remaining time. The game will end when either all questions are answered or the timer reaches 0. Good luck and have fun!";
        main.appendChild(introduction);
    // Create the button group and buttons
    var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btnGroup");
        main.appendChild(btnGroup);
    var startButton = document.createElement("button");
        startButton.setAttribute("id", "startButton");
        startButton.textContent = "Start Quiz";
        btnGroup.appendChild(startButton);
    var viewScoresButton = document.createElement("button");
        viewScoresButton.setAttribute("id", "viewScoresButton");
        viewScoresButton.textContent = "View High Scores";
        btnGroup.appendChild(viewScoresButton);
    startButton.addEventListener("click", function() {
        clearMain();
        askQuestion(0);
        countdown();
    });
    viewScoresButton.addEventListener("click", function() {
        clearMain();
        scoreboard();
    });
    // Set initial values
    score.textContent = scoreValue;
    timer.textContent = timeLeft;
    hiScore.textContent = hiScoreValue;
}

// Ask the question and display the answers
function askQuestion(questionNumber) {
    var questionTitle = document.createElement("h2");
        questionTitle.setAttribute("class", "question");
        questionTitle.textContent = questions[questionNumber].question;
        main.appendChild(questionTitle);
    var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btnGroup");
        main.appendChild(btnGroup);
    for (var i = 0; i < questions[questionNumber].answers.length; i++) {       
        var answerBtn = document.createElement("button");
            answerBtn.setAttribute("class", "answerBtn");
            answerBtn.setAttribute("id", "answer" + i);
            answerBtn.textContent = questions[questionNumber].answers[i];
            btnGroup.appendChild(answerBtn);
        var selectedAnswer = document.querySelector("#answer" + i);
        selectedAnswer.addEventListener("click", function() {            
            if (this.textContent === questions[questionNumber].answers[questions[questionNumber].correctAnswer]) {
                var correctMsg = document.createElement("p");
                    correctMsg.setAttribute("id", "correctMsg");
                    correctMsg.textContent = "Correct!";
                    main.appendChild(correctMsg);
                addPoint();
                disableButtons();
                nextQuestion(questionNumber);
            } else {
                var incorrectMsg = document.createElement("p");
                    incorrectMsg.setAttribute("id", "incorrectMsg");
                    incorrectMsg.textContent = "Incorrect!";
                    main.appendChild(incorrectMsg);
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
        }, 500);
    } else {
        setTimeout(function() {
            clearMain();
            endQuiz();
        }, 500);
    }
}

// Countdown function runs when the quiz starts and ends the quiz when it reaches 0 or all questions are answered
function countdown() {
    var timeInterval = setInterval(function() {
        if (timeLeft > 0) {
            timer.textContent = timeLeft;
            timeLeft--;
        } else {
            timer.textContent = 0;
            clearInterval(timeInterval);
            clearMain()
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

function endQuiz() {
    // Stops the timer if user answers all questions
    timeLeft = 0;
    timer.textContent = timeLeft;
    // Create the quiz over title
    var quizOverTitle = document.createElement("h1");
        quizOverTitle.textContent = "Quiz Over!";
        main.appendChild(quizOverTitle);
    // Create the form
    var submitScoreForm = document.createElement("form");
        submitScoreForm.setAttribute("id", "submitScoreForm");
        main.appendChild(submitScoreForm);
    // Create the initials input field
    var initialsInput = document.createElement("input");
        initialsInput.setAttribute("id", "initialsInput");
        initialsInput.setAttribute("type", "text");
        initialsInput.setAttribute("maxlength", "2");
        initialsInput.setAttribute("required", "true");
        initialsInput.setAttribute("placeholder", "Enter Your Initials");
        submitScoreForm.appendChild(initialsInput);
    // Create the submit score button
    var submitScoreBtn = document.createElement("button");
        submitScoreBtn.setAttribute("id", "submitScoreBtn");
        submitScoreBtn.textContent = "Submit Score"; 
        submitScoreForm.appendChild(submitScoreBtn);  
    submitScoreBtn.addEventListener("click", function() {
        // Prevent form from refreshing the page
        event.preventDefault();
        //Get the value of the input field
        var initialsInput = document.getElementById("initialsInput").value; 
        // Convert to uppercase
        var initials = initialsInput.toUpperCase(); 
        // Create a string of the alphabet to check against
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; 
        // Prevent user from entering anything other than letters
        for (var i = 0; i < initials.length; i++) {
            if (alphabet.indexOf(initials[i]) === -1) {
                alert("Please enter only letters A-Z");
                return;
            }
        }
        // Prevent user from entering a blank value or a single letter
        if (initials.length < 2) {
            alert("Please enter 2 letters");
            return;
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
        clearMain()
        scoreboard();
    });    
}

function scoreboard() {
    // Create the high scores title
    var highScoresTitle = document.createElement("h1");
        highScoresTitle.textContent = "High Scores";
        main.appendChild(highScoresTitle);
    // Get the high score from local storage if it exists, otherwise set it to 0
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
    // Create the score list and populate it with the scores from local storage if there are any
    if (parsedEntry.length === 0) {
        // Create a message if no scores exist
        var noScoreItem = document.createElement("p");
            noScoreItem.textContent = "No scores yet!";
            noScoreItem.style.textAlign = "center";
            main.appendChild(noScoreItem);
    } else {
        // Update the high score if a new high score is achieved
        hiScoreValue = parsedEntry[0].score;
        hiScore.textContent = hiScoreValue;
        // Create the score list if scores exist
        var scoreList = document.createElement("ol");
        scoreList.setAttribute("id", "scoreList");
        main.appendChild(scoreList);
        // Create the score list items and populate them with the initials and score
        for(var i = 0; i < parsedEntry.length; i++) {
            // Create a list item to hold the initials and score and add it to the score list
            var scoreItem = document.createElement("li");
                scoreList.appendChild(scoreItem);
            // Create a span to hold the initials and add it to the score item
            var scoreList_Initials = document.createElement("span");
                scoreList_Initials.setAttribute("class", "scoreList_Initials");
                scoreList_Initials.textContent = parsedEntry[i].initials;
                scoreItem.appendChild(scoreList_Initials);
            // Create a span to hold the score and add it to the score item
            var scoreList_Score = document.createElement("span");
                scoreList_Score.setAttribute("class", "scoreList_Score");
                scoreList_Score.textContent = parsedEntry[i].score;
                scoreItem.appendChild(scoreList_Score);
        }
    }
    // Create replay button and restart the game when clicked
    var replayBtn = document.createElement("button");
        replayBtn.setAttribute("id", "replayBtn");
        replayBtn.textContent = "Replay";
        main.appendChild(replayBtn);
    replayBtn.addEventListener("click", function(){
        clearMain();
        startUp();
        timeLeft = 30;
        timer.textContent = timeLeft;
        scoreValue = 0;
        score.textContent = scoreValue;
    });
    // Create clear scores button and confirm before clearing
    var clearScoresBtn = document.createElement("button");
        clearScoresBtn.setAttribute("id", "clearScoresBtn");
        clearScoresBtn.textContent = "Clear Scores";
        main.appendChild(clearScoresBtn);
    clearScoresBtn.addEventListener("click", function(){
        if (parsedEntry.length === 0) {
            alert("There are no scores to clear!");
            return;
        } else {
            confirm("Are you sure you want to clear the scoreboard?");
            localStorage.clear();
            scoreList.innerHTML = "";
            hiScoreValue = 0;
            hiScore.textContent = hiScoreValue;
        }
    });
    // Create a button group to hold the buttons
    var btnGroup = document.createElement("div");
        btnGroup.setAttribute("class", "btnGroup");
        main.appendChild(btnGroup);
        btnGroup.appendChild(replayBtn);
        btnGroup.appendChild(clearScoresBtn);
}

startUp();// Call the startUp function to begin the quiz. 

// Kind of ironic that the start of the program is at the end. Honestly, I can't believe I got this to work. My brain hurts. 