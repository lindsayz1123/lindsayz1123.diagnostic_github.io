// -------------------------
// GET HTML ELEMENTS
// -------------------------

const topicInput = document.getElementById("topic");
const continueButton = document.getElementById("continueButton");

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");

const unitName = document.getElementById("unitName");
const difficultyText = document.getElementById("difficulty");
const questionText = document.getElementById("questionText");
const answerChoices = document.getElementById("answerChoices");
const submitButton = document.getElementById("submitButton");
const masteryResultsContainer =
    document.getElementById("masteryResults");


// -------------------------
// GET UNITS
// -------------------------

const units = [
    ...new Set(
        questionBank.map(function (question) {
            return question.unit;
        })
    )
];


// -------------------------
// DIAGNOSTIC VARIABLES
// -------------------------

let currentUnitIndex = 0;
let currentDifficulty = "easy";

let selectedAnswer = null;
let currentQuestion = null;

let masteryResults = {};


// -------------------------
// START DIAGNOSTIC
// -------------------------

continueButton.addEventListener("click", function () {

    const topic = topicInput.value.trim().toLowerCase();

    if (topic === "") {
        alert("Please enter a topic.");
        return;
    }

    if (topic !== "java") {
        alert("For now, please enter Java.");
        return;
    }

    // Reset diagnostic
    currentUnitIndex = 0;
    currentDifficulty = "easy";
    selectedAnswer = null;
    masteryResults = {};

    // Change screens
    startScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});


// -------------------------
// SHOW QUESTION
// -------------------------

function showQuestion() {

    // Finished all units
    if (currentUnitIndex >= units.length) {
        showResults();
        return;
    }

    const currentUnit = units[currentUnitIndex];

    // Find question for current unit + difficulty
    currentQuestion = questionBank.find(function (q) {

        return (
            q.unit === currentUnit &&
            q.difficulty === currentDifficulty
        );

    });


    // Safety check
    if (!currentQuestion) {

        console.error(
            "Missing question:",
            currentUnit,
            currentDifficulty
        );

        return;
    }


    // Reset selected answer
    selectedAnswer = null;


    // Show unit
    unitName.textContent =
        "Unit " +
        (currentUnitIndex + 1) +
        " of " +
        units.length +
        ": " +
        currentUnit;


    // Show difficulty
    difficultyText.textContent =
        "Difficulty: " + currentDifficulty;


    // Show question
    questionText.textContent =
        currentQuestion.question;


    // Clear old answers
    answerChoices.innerHTML = "";


    // Create answer buttons
    currentQuestion.choices.forEach(
        function (choice, index) {

            const button =
                document.createElement("button");

            button.textContent = choice;

            button.className = "answer-button";


            // Select answer
            button.addEventListener(
                "click",
                function () {

                    // Remove selected style
                    const allButtons =
                        document.querySelectorAll(
                            ".answer-button"
                        );

                    allButtons.forEach(
                        function (btn) {
                            btn.classList.remove(
                                "selected"
                            );
                        }
                    );


                    // Select this button
                    button.classList.add("selected");

                    selectedAnswer = index;
                }
            );


            answerChoices.appendChild(button);
        }
    );
}


// -------------------------
// SUBMIT ANSWER
// -------------------------

submitButton.addEventListener(
    "click",
    function () {

        if (selectedAnswer === null) {

            alert("Please select an answer.");

            return;
        }

        checkAnswer(
            selectedAnswer,
            currentQuestion
        );
    }
);


// -------------------------
// CHECK ANSWER
// -------------------------

function checkAnswer(selectedAnswer, question) {

    const isCorrect =
        selectedAnswer === question.correctAnswer;

    const currentUnit =
        units[currentUnitIndex];


    // -------------------------
    // EASY
    // -------------------------

    if (currentDifficulty === "easy") {

        // Failed easy
        if (!isCorrect) {

            masteryResults[currentUnit] = 25;

            moveToNextUnit();

            return;
        }


        // Passed easy
        currentDifficulty = "medium";

        showQuestion();

        return;
    }


    // -------------------------
    // MEDIUM
    // -------------------------

    if (currentDifficulty === "medium") {

        // Failed medium
        if (!isCorrect) {

            masteryResults[currentUnit] = 50;

            moveToNextUnit();

            return;
        }


        // Passed medium
        currentDifficulty = "difficult";

        showQuestion();

        return;
    }


    // -------------------------
    // DIFFICULT
    // -------------------------

    if (currentDifficulty === "difficult") {

        // Passed difficult
        if (isCorrect) {

            masteryResults[currentUnit] = 100;

        }

        // Failed difficult
        else {

            masteryResults[currentUnit] = 75;

        }


        moveToNextUnit();
    }
}


// -------------------------
// NEXT UNIT
// -------------------------

function moveToNextUnit() {

    currentUnitIndex++;

    currentDifficulty = "easy";

    selectedAnswer = null;

    showQuestion();
}


// -------------------------
// SHOW FINAL RESULTS
// -------------------------

function showResults() {

    quizScreen.classList.add("hidden");

    resultsScreen.classList.remove("hidden");


    // Clear previous results
    masteryResultsContainer.innerHTML = "";


    // Display each unit
    units.forEach(function (unit) {

        const mastery =
            masteryResults[unit];


        // Result container
        const resultBox =
            document.createElement("div");

        resultBox.className = "result-box";


        // Unit name
        const resultUnitName =
            document.createElement("h3");

        resultUnitName.textContent = unit;

        resultBox.appendChild(
            resultUnitName
        );


        // Mastery percentage
        const masteryText =
            document.createElement("p");

        masteryText.textContent =
            mastery + "% Mastery";

        resultBox.appendChild(
            masteryText
        );


        // Mastery bar
        const masteryBar =
            document.createElement("div");

        masteryBar.className =
            "mastery-bar";


        const masteryFill =
            document.createElement("div");

        masteryFill.className =
            "mastery-fill";

        masteryFill.style.width =
            mastery + "%";


        masteryBar.appendChild(
            masteryFill
        );

        resultBox.appendChild(
            masteryBar
        );

        masteryResultsContainer.appendChild(
            resultBox
        );
    });


    // This is the data that can later
    // be sent to the AI course generator
    console.log(
        "Mastery Results:",
        masteryResults
    );
}
