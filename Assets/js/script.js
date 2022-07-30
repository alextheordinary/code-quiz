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
// Element selector for question card
var questionCardEl = document.getElementById('question-card');
// Default game length
var defaultGameLength = 60;
// Default wrong answer penalty
var defaultPenalty = 10;
// Default # of answer choices
var defaultChoices = 4 ;
// Number variable for the timer value
var gameTime = defaultGameLength;
// Boolean to show if time is up
var timeUp = false;
// Boolean to show if game is in progress
var gameInProgress = false;
// Objects for questions and answers
var quizQuestion1 = {
    question: "Q1",
    correctAnswer: "C1",
    choices: ["C1", "C2", "C3", "C4"]
}
var quizQuestion2 = {
    question: "Q2",
    correctAnswer: "C1",
    choices: ["C1", "C2", "C3", "C4"]
}
var quizQuestion3 = {
    question: "Q3",
    correctAnswer: "C1",
    choices: ["C1", "C2", "C3", "C4"]
}
var quizQuestion4 = {
    question: "Q4",
    correctAnswer: "C1",
    choices: ["C1", "C2", "C3", "C4"]
}
var quizQuestion5 = {
    question: "Q5",
    correctAnswer: "C1",
    choices: ["C1", "C2", "C3", "C4"]
}
// Array to story quizQuestion objects
var questionsArray = [];
// Count of questions answered
var questionsAnswered = 0;

// Function declarations

// Add questions to questionsArray[]
function addQuestions() {
    questionsArray = [];
    questionsArray.push(quizQuestion1);
    questionsArray.push(quizQuestion2);
    questionsArray.push(quizQuestion3);
    questionsArray.push(quizQuestion4);
    questionsArray.push(quizQuestion5);
}


// Starts the game - Sets gameTimer to defaultGameLength, setsQuestionsAnswered to zero, calls addQuestions, calls startTimer, sets gameInProgress to true and calls displayQuestion to show the first question
function startGame() {
    gameTime = defaultGameLength;
    questionsAnswered = 0;
    gameInProgress = true;
    addQuestions();
    // Call startTimer()
    startTimer();
    // Call displayQuestion()
    displayQuestion();

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

// Choose a question randomly from questionsArray. Displays a question with a set of 4 answers. Each answer is a button with an event listener that calls checkAnswer(). Data attribute for correct answer is set to true. All others false. Removes chosen question from questionsArray.
function displayQuestion() {
    var randomQuestionIndex = Math.floor(Math.random() * questionsArray.length);
    var chosenQuestion = questionsArray[randomQuestionIndex].question ;
    var chosenChoices = questionsArray[randomQuestionIndex].choices ;
    questionCardEl.children[0].textContent = chosenQuestion ;
    for (var i = 1; i <= defaultChoices ; i++) {
        var randomChoiceIndex = Math.floor(Math.random() * chosenChoices.length) ;
        var randomChoice = chosenChoices.splice(randomChoiceIndex,1).join();
        questionCardEl.children[i].textContent = randomChoice ;
        if (randomChoice === questionsArray[randomQuestionIndex].correctAnswer) {
            questionCardEl.children[i].dataset.correct = "true"
        } else {
            questionCardEl.children[i].dataset.correct = "false"
        }
    }
    questionCardEl.setAttribute("style", "visibility:visible") ;
    questionsArray.splice(randomQuestionIndex,1) ;
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
function showStartScreen() {
    startButtonEl.addEventListener("click", startGame);
}

// Adds the latest scoreObject to the highScores array. Sorts array by scoreObject.score in descending order. Adds array to localstorage "high-scores"
function addHighScore() {

}

// Initialize local storage variables and call showStartScreen()
function init() {
    var storedHighScores = JSON.parse(localStorage.getItem("high-scores"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
    showStartScreen();

    // add event listeners to buttons
}

init();