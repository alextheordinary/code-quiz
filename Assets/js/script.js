// Variable declarations

// Array of high scores - will need to be reordered based on which score is highest
var highScores = [];
// Score Object that contains intials and score
var scoreObject = {
    initials: "",
    score: 0
}
// Element selector for the start button
var startButtonEl = document.getElementById('start-button');
// Element selector for the displayed timer
var timerEl = document.getElementById('countdown-timer');
// Default game length
var defaultGameLength = 60;
// Default wrong answer penalty
var defaultPenalty = 5;
// Number variable for the timer value
var gameTime = defaultGameLength;
// Boolean to show if time is up
var timeUp = false;
// Boolean to show if game is in progress
var gameInProgress = false;
// Object for questions and answers
var quizQuestion = {
    question: "" ,
    correctAnswer: "",
    wrongA1: "",
    wrongA2: "",
    wrongA3: ""
}
// Array to story quizQuestion objects
var questionsArray = [] ;
// Count of questions answered
var questionsAnswered = 0 ;

// Function declarations

// Starts the game - Sets gameTimer to defaultGameLength, setsQuestionsAnswered to zero, calls startTimer, sets gameInProgress to true and calls displayQuestion to show the first question
function startGame() {
    gameTime = defaultGameLength;
    questionsAnswered = 0 ;
    gameInProgress = true ;
    // Call startTimer()
    startTimer();
    // Call displayQuestion()

}

// Starts a timer
function startTimer() {
    var gameTimeInterval = setInterval(function () {

        // Check to see if time is up. If time is up (gameTime <== 0) then clear the interval and set timeUp to true. Otherwise, decrement gameTime

        if (gameTime <= 0) {
            clearInterval(gameTimeInterval);
            timeUp = true;
            timerEl.textContent = "Times up!"
        } else if (gameInProgress = false) {
            clearInterval(gameTimeInterval);
        } else {
            timerEl.textContent = "Time " + gameTime;
            gameTime--;
        }
    }, 1000);
}

// Displays a question with a set of 4 answers. Each answer is a button with an event listener that calls checkAnswer()
function displayQuestion() {

}

// Checks to see if the answer chosen is correct by checking the state of data-attribute correct-answer. If wrong, deducts time and says Wrong! Otherwise, says Correct!. Either way, moves to next question as long as there are questions and time remaining.
function checkAnswer() {

}

// Called when the game ends due to time up or all questions answered. Displays a message about the game being over, displays score, and displays a form for initials for high sccore. Form only submits when it isn't blank. Form submission calls addHighScore().

function endGame() {

}

// Shows ordered list of high scores along with buttons to clear the list and go back to start screen. 
function showHighScores() {

}

// Shows the start screen that describes the quiz and has a button to start the quiz
function showStartScreen () {

}

// Adds the latest scoreObject to the highScores array. Sorts array by scoreObject.score in descending order. Adds array to localstorage "high-scores"
function addHighScore() {

}

// Initialize local storage variables and call showStartScreen()
function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("high-scores")) ;
    if (storedHighScores !== null) {
        highScores = storedHighScores ;
    }
}



// Event listeners - probably move this inside showStartScreen
startButtonEl.addEventListener("click", startGame) ;