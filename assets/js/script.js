console.log("IT BEGINS!");

// START SCREEN
    // START BUTTON -> USER PRESSES IT -> BUTTON DISAPPEARS AND THE FIRST QUESTION AND ANSWER CHOICES DISPLAYS -> TIMER STARTS

// TIMER COUNTDOWN FROM A SET TIME (LENGTH DETERMINED BY USER?)
    // CONSTANTLY DECREASES BY 1 SEC
    // IF USER GETS A QUESTION INCORRECT THEN TIME IS SUBTRACTED

var countdown = document.getElementById('timerValue');
countdown.textContent = '90';

// MULTIPLE CHOICE QUESTIONS
    // RANDOMIZED ORDER OF QUESTIONS
        // NEED TO MAKE SURE QUESTION ISN'T ASKED AGAIN AFTER IT IS ANSWERED
    // RANDOMIZED ORDER OF ANSWERS
    // IF ANSWER IS CORRECT, SOME INDICATION THAT IT IS CORRECT
    // IF ANSWER IS INCORRECT, SOME INDICATION THAT IT IS INCORRECT
        // DOES NOT SHOW CORRECT ANSWER IF THEY GOT IT WRONG
    // WHEN USER SELECTS AN ANSWER IT WILL DISPLAY IF IT WAS CORRECT OR INCORRECT FOR A FEW SECONDS AND THE TIMER WILL BE PAUSED BEFORE THE NEXT QUESTION DISPLAYS
    // MAKE ALL ANSWER CHOICES BUTTONS

var questions = document.getElementById('question');
var questionsArray = 
['This is the first question?', 
'This is the second question?',
'This is the third question?', 
'This is the fourth question?',
'This is the fifth question?',
'This is the sixth question?', 
'This is the seventh question?',
'This is the eighth question?', 
'This is the ninth question?',
'This is the tenth question?'];
var getRandomQuestion = Math.floor(Math.random() * questionsArray.length);
questions.textContent = questionsArray[getRandomQuestion];

var answers = document.getElementsByClassName('answer');
var answersArray = 
['Answer One',
'Answer Two',
'Answer Three',
'Answer Four'];



// SCORE KEEPING
    // INCREASES FOR EVERY CORRECT ANSWER
    // HIGHEST SCORE STAYS DISPLAYED FOR ENTIRE TIME THE QUIZ IS BEING DONE, DOES NOT SAVE IF YOU LEAVE AND COME BACK

var currentScore = document.getElementById('scoreValue');
currentScore.textContent = '69';
var highScore = document.getElementById('hiScoreValue');
highScore.textContent = '42';

// GAME OVER SCREEN
    // DISPLAY FINAL SCORE AND ALLOW USER TO ENTER INITIALS
    // HAS A BUTTON TO REPLAY WHICH TAKES YOU BACK TO THE START SCREEN

console.log("IT ENDS!");