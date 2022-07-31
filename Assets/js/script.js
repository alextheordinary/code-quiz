// Variable declarations

// Array of high scores - will need to be reordered based on which score is highest
var highScores = [];
// Score Object that contains intials and score
var scoreObject = {
    initials: "",
    score: 0
};
// Element selector for the start button
var startButtonEl = document.getElementById('start-button');
// Element selector for the displayed timer
var timerEl = document.getElementById('countdown-timer');
// Selector for View High Scores Link
var highScoresLinkEl = document.getElementById('view-high-scores');
// Container element selectors
var questionContainerEl = document.getElementById('question-container');
var endGameContainerEl = document.getElementById("end-game-container");
var highScoresContainerEl = document.getElementById("high-scores-container");
var startScreenContainerEl = document.getElementById("start-screen-container");
var highScoresListEl = document.getElementById("high-scores-list");
var navBarContainerEl = document.getElementById("nav-bar-container");
var messageTextEl = document.getElementById("message-text");
// Element selectors for buttons
var button1El = document.getElementById('button-1');
var button2El = document.getElementById('button-2');
var button3El = document.getElementById('button-3');
var button4El = document.getElementById('button-4');
var goBackButtonEl = document.getElementById('go-back');
var submitHSButtonEl = document.getElementById("submit-high-score");
var resetHSButtonEl = document.getElementById("reset-high-scores");
// Default game length
var defaultGameLength = 60;
// Default wrong answer penalty
var defaultPenalty = 10;
// Default # of answer choices
var defaultChoices = 4;
// Number variable for the timer value
var gameTime = defaultGameLength;
// Boolean to show if time is up
var timeUp = false;
// Boolean to show if game is in progress
var gameInProgress = false;
// Objects for questions and answers
var quizQuestion1;
var quizQuestion2;
var quizQuestion3;
var quizQuestion4;
var quizQuestion5;
// Array to story quizQuestion objects
var questionsArray = [];
// Interval used to hide a message after 2 seconds
var messageInterval;
var gameTimeInterval;

// Function declarations

// Add questions to questionsArray[]
function addQuestions() {
    quizQuestion1 = {
        question: "JSON is an acronym that stands for _________",
        correctAnswer: "JavaScript Object Notation",
        choices: ["Jason String Orb Net", "JavaScript Object Notation", "JavaScript Order Notification", "JavaScript Ordinal Network"]
    };
    quizQuestion2 = {
        question: "Which one of these functions can be used to convert an array into a string?",
        correctAnswer: "join()",
        choices: ["push()", "join()", "splice()", "pop()"]
    };
    quizQuestion3 = {
        question: "For the following code setInterval(function(){}, x), what value must x be for the function to execute every 3 seconds?",
        correctAnswer: "3000",
        choices: ["3", "300", "3000", "1000"]
    };
    quizQuestion4 = {
        question: "Which one of these numbers could be returned by Math.random() ?",
        correctAnswer: ".2937",
        choices: ["1", "5", "5.235", ".2937"]
    };
    quizQuestion5 = {
        question: "Which one of the following statements will return true?",
        correctAnswer: "Math.floor(5.7425) === 5",
        choices: ["\"5\" === 5", "Math.floor(5.7425) === 5", "6 < 5", "Math.floor(5.7425) > 5"]
    };
    questionsArray = [];
    questionsArray.push(quizQuestion1);
    questionsArray.push(quizQuestion2);
    questionsArray.push(quizQuestion3);
    questionsArray.push(quizQuestion4);
    questionsArray.push(quizQuestion5);
}


// Starts the game - Sets gameTimer to defaultGameLength, calls addQuestions, calls startTimer, sets gameInProgress to true and calls displayQuestion to show the first question
function startGame() {
    gameInProgress = true;
    addQuestions();
    // Call startTimer()
    startTimer();
    // Call displayQuestion()
    displayQuestion();
    startScreenContainerEl.setAttribute("style", "display:none");
}

// Starts a timer
function startTimer() {
    gameTimeInterval = setInterval(function () {

        // Check to see if time is up. If time is up (gameTime <= 0) then clear the interval and set timeUp to true. Otherwise, decrement gameTime

        if (gameTime <= 0) {
            clearInterval(gameTimeInterval);
            timeUp = true;
            timerEl.textContent = "Times up!"
            endGame();
        } else if (gameInProgress === false) {
            clearInterval(gameTimeInterval);
        } else {
            timerEl.textContent = "Time " + gameTime;
            gameTime--;
        }
    }, 1000);
}

// Choose a question randomly from questionsArray. Displays a question with a set of 4 answers that are randomly ordered. Each answer is a button with an event listener that calls checkAnswer(). Data attribute for correct answer is set to true. All others false. Removes chosen question from questionsArray.
function displayQuestion() {
    var randomQuestionIndex = Math.floor(Math.random() * questionsArray.length);
    var chosenQuestion = questionsArray[randomQuestionIndex].question;
    var chosenChoices = questionsArray[randomQuestionIndex].choices;
    questionContainerEl.children[0].textContent = chosenQuestion;
    for (var i = 1; i <= defaultChoices; i++) {
        var randomChoiceIndex = Math.floor(Math.random() * chosenChoices.length);
        var randomChoice = chosenChoices.splice(randomChoiceIndex, 1).join();
        questionContainerEl.children[i].textContent = randomChoice;
        if (randomChoice === questionsArray[randomQuestionIndex].correctAnswer) {
            questionContainerEl.children[i].dataset.correct = "true"
        } else {
            questionContainerEl.children[i].dataset.correct = "false"
        }
    }
    questionContainerEl.setAttribute("style", "display:initial");
    questionsArray.splice(randomQuestionIndex, 1);
}

// Checks to see if the answer chosen is correct by checking the state of data-attribute data-correct. If wrong, deducts time and says Wrong! Otherwise, says Correct!. Either way, moves to next question as long as there are questions and time remaining.
function checkAnswer(event) {
    clearInterval(messageInterval);
    messageTextEl = document.getElementById("message-text");
    if (event.target.dataset.correct === "true") {
        messageTextEl.textContent = "Correct!";
    }
    else {
        messageTextEl.textContent = "Wrong!";
        gameTime = gameTime - defaultPenalty;
        if (gameTime < 0) {
            gameTime = 0;
        }
    }
    messageTextEl.setAttribute("style", "display:initial");
    // Function to make message disappear after 2 seconds
    messageInterval = setInterval(function () {
        messageTextEl.setAttribute("style", "display:none");
        clearInterval(messageInterval);
    }, 2000);
    if (questionsArray.length === 0) {
        gameInProgress = false;
        timerEl.textContent = "Time " + gameTime;
        endGame();
        questionContainerEl.setAttribute("style", "display:none");
    } else if ((gameTime > 0) && (gameInProgress === true)) {
        displayQuestion();
    }
}

// Called when the game ends due to time up or all questions answered. Displays a message about the game being over, displays score, and displays a form for initials for high sccore. Form only submits when it isn't blank and requires 2-3 characters. Form submission calls addHighScore().

function endGame() {
    clearInterval(gameTimeInterval);
    startScreenContainerEl.setAttribute("style", "display:none");
    questionContainerEl.setAttribute("style", "display:none");
    highScoresContainerEl.setAttribute("style", "display:none");
    endGameContainerEl.setAttribute("style", "display:none");
    var endGameMessageEl = document.getElementById("end-game-message");
    var highScoreFormEl = document.getElementById("high-scoreform");
    endGameMessageEl.textContent = "The game is over. You got a score of " + gameTime;
    endGameContainerEl.setAttribute("style", "display:initial");
}

// Shows ordered list of high scores along with buttons to clear the list and go back to start screen. 
function showHighScores() {
    clearInterval(gameTimeInterval);
    startScreenContainerEl.setAttribute("style", "display:none");
    questionContainerEl.setAttribute("style", "display:none");
    endGameContainerEl.setAttribute("style", "display:none");
    navBarContainerEl.setAttribute("style", "display:none");
    messageTextEl.setAttribute("style", "display:none");
    highScoresListEl.innerHTML = '';
    highScoresListEl.innerHTML = "<h4>High Scores</h4>"
    for (var i = 0; i < highScores.length; i++) {
        var highScoreEl = document.createElement("li");
        highScoreEl.textContent = highScores[i].initials + " - " + highScores[i].score;
        highScoresListEl.appendChild(highScoreEl);
    }
    highScoresContainerEl.setAttribute("style", "display:initial");
}

// Shows the start screen that describes the quiz and has a button to start the quiz
function showStartScreen() {
    highScoresContainerEl.setAttribute("style", "display:none");
    startScreenContainerEl.setAttribute("style", "display:initial");
}

// Adds the latest scoreObject to the highScores array. Sorts array by scoreObject.score in descending order. Adds array to localstorage "high-scores"
function addHighScore(event) {
    event.preventDefault();
    messageTextEl = document.getElementById("message-text");
    scoreObject.initials = document.getElementById("initials").value.trim();
    if (scoreObject.initials.length < 2) {
        messageTextEl.textContent = "Intials must be between 2 and 3 characters in length";
        messageTextEl.setAttribute("style", "display:initial");
        return;
    } else {
        scoreObject.score = gameTime;
        highScores.push(scoreObject);
        // Sort function to be added
        highScores.sort(function (a, b) {
            return b.score - a.score;
        });
        // Store sorted high score
        localStorage.setItem("high-scores", JSON.stringify(highScores));
        endGameContainerEl.setAttribute("style", "display:none");
        document.getElementById('initials').value = '';
        messageTextEl.textContent = "";
        messageTextEl.setAttribute("style", "display:none");
        showHighScores();
    }
}

// Resets the high score list and resets the local storage for it

function resetHighScores(event) {
    event.preventDefault();
    highScores = [];
    localStorage.removeItem("high-scores");
    showHighScores();
}

// Initialize local storage variables and call showStartScreen(). Display:nones to hide any containers that aren't needed at start.
function init() {
    startScreenContainerEl.setAttribute("style", "display:none");
    questionContainerEl.setAttribute("style", "display:none");
    highScoresContainerEl.setAttribute("style", "display:none");
    endGameContainerEl.setAttribute("style", "display:none");
    navBarContainerEl.setAttribute("style", "display:initial");
    var storedHighScores = JSON.parse(localStorage.getItem("high-scores"));
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
    gameTime = defaultGameLength;
    timerEl.textContent = "Time " + gameTime;
    showStartScreen();


    // add event listeners to buttons
    startButtonEl.addEventListener("click", startGame);
    button1El.addEventListener("click", checkAnswer);
    button2El.addEventListener("click", checkAnswer);
    button3El.addEventListener("click", checkAnswer);
    button4El.addEventListener("click", checkAnswer);
    submitHSButtonEl.addEventListener("click", addHighScore);
    goBackButtonEl.addEventListener("click", init);
    resetHSButtonEl.addEventListener("click", resetHighScores);
    highScoresLinkEl.addEventListener("click", showHighScores);
    showStartScreen();
}

init();