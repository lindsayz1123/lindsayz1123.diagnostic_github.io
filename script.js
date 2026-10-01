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

const questionArea = document.getElementById("questionText");

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
let diagnosticData = {};
let studentProfile = {};


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
    diagnosticData = {};
    studentProfile = {};

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
        createStudentProfile();
        showResults();
        return;
    }

    const currentUnit = units[currentUnitIndex];

    // Find the correct question
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


    // -------------------------
    // UNIT INFORMATION
    // -------------------------

    unitName.textContent =
        "Unit " +
        (currentUnitIndex + 1) +
        " of " +
        units.length +
        ": " +
        currentUnit;


    difficultyText.textContent =
        "Difficulty: " + currentDifficulty;


    // -------------------------
    // QUESTION + CODE
    // -------------------------

    questionArea.innerHTML = "";

    const questionParts =
        currentQuestion.question.split("\n\n");


    // First part is the question
    const questionHeading =
        document.createElement("h2");

    questionHeading.className =
        "question-text";

    questionHeading.textContent =
        questionParts[0];

    questionArea.appendChild(
        questionHeading
    );


    // Everything after the first blank line
    // is displayed as code
    if (questionParts.length > 1) {

        const codeBlock =
            document.createElement("pre");

        codeBlock.className =
            "code-block";


        const code =
            document.createElement("code");

        code.textContent =
            questionParts
                .slice(1)
                .join("\n\n");


        codeBlock.appendChild(code);

        questionArea.appendChild(
            codeBlock
        );
    }


    // -------------------------
    // ANSWER CHOICES
    // -------------------------

    answerChoices.innerHTML = "";


    currentQuestion.choices.forEach(
        function (choice, index) {

            const button =
                document.createElement("button");

            button.textContent = choice;

            button.className =
                "answer-button";


            button.addEventListener(
                "click",
                function () {

                    // Remove old selection
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


                    // Select this answer
                    button.classList.add(
                        "selected"
                    );

                    selectedAnswer = index;
                }
            );


            answerChoices.appendChild(
                button
            );
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
        selectedAnswer ===
        question.correctAnswer;


    const currentUnit =
        units[currentUnitIndex];


    // -------------------------
    // CREATE DATA FOR UNIT
    // -------------------------

    if (!diagnosticData[currentUnit]) {

        diagnosticData[currentUnit] = {

            questionsAttempted: 0,

            highestDifficultyReached:
                "easy",

            answers: [],

            mastery: 0
        };
    }


    // Record attempt
    diagnosticData[currentUnit]
        .questionsAttempted++;


    diagnosticData[currentUnit]
        .highestDifficultyReached =
        currentDifficulty;


    diagnosticData[currentUnit]
        .answers.push({

            questionId:
                question.id,

            concept:
                question.concept,

            difficulty:
                currentDifficulty,

            selectedAnswer:
                selectedAnswer,

            correctAnswer:
                question.correctAnswer,

            correct:
                isCorrect
        });


    // -------------------------
    // EASY
    // -------------------------

    if (currentDifficulty === "easy") {

        if (!isCorrect) {

            masteryResults[currentUnit] = 25;

            finishUnit(currentUnit);

            return;
        }


        currentDifficulty = "medium";

        showQuestion();

        return;
    }


    // -------------------------
    // MEDIUM
    // -------------------------

    if (currentDifficulty === "medium") {

        if (!isCorrect) {

            masteryResults[currentUnit] = 50;

            finishUnit(currentUnit);

            return;
        }


        currentDifficulty = "difficult";

        showQuestion();

        return;
    }


    // -------------------------
    // DIFFICULT
    // -------------------------

    if (currentDifficulty === "difficult") {

        if (isCorrect) {

            masteryResults[currentUnit] = 100;

        } else {

            masteryResults[currentUnit] = 75;
        }


        finishUnit(currentUnit);
    }
}


// -------------------------
// FINISH UNIT
// -------------------------

function finishUnit(unit) {

    diagnosticData[unit].mastery =
        masteryResults[unit];

    moveToNextUnit();
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
// COURSE ACTION
// -------------------------

function getCourseAction(mastery) {

    if (mastery === 100) {
        return "Skip";
    }

    if (mastery === 75) {
        return "Brief Review";
    }

    if (mastery === 50) {
        return "Teach";
    }

    return "Teach from Fundamentals";
}


// -------------------------
// CREATE STUDENT PROFILE
// -------------------------

function createStudentProfile() {

    studentProfile = {

        subject: "Java",

        diagnosticCompleted: true,

        units: []
    };


    units.forEach(function (unit) {

        const data =
            diagnosticData[unit];


        studentProfile.units.push({

            unit: unit,

            mastery:
                data.mastery,

            questionsAttempted:
                data.questionsAttempted,

            highestDifficultyReached:
                data.highestDifficultyReached,

            courseAction:
                getCourseAction(
                    data.mastery
                ),

            answers:
                data.answers
        });
    });


    console.log(
        "Student Profile:",
        studentProfile
    );
}


// -------------------------
// SHOW FINAL RESULTS
// -------------------------

function showResults() {

    quizScreen.classList.add("hidden");

    resultsScreen.classList.remove(
        "hidden"
    );


    masteryResultsContainer.innerHTML = "";


    studentProfile.units.forEach(
        function (result) {

            // Result box
            const resultBox =
                document.createElement("div");

            resultBox.className =
                "result-box";


            // Unit
            const resultUnitName =
                document.createElement("h3");

            resultUnitName.textContent =
                result.unit;

            resultBox.appendChild(
                resultUnitName
            );


            // Mastery
            const masteryText =
                document.createElement("p");

            masteryText.textContent =
                result.mastery +
                "% Mastery";

            resultBox.appendChild(
                masteryText
            );


            // Course recommendation
            const actionText =
                document.createElement("p");

            actionText.className =
                "course-action";

            actionText.textContent =
                "Learning Path: " +
                result.courseAction;

            resultBox.appendChild(
                actionText
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
                result.mastery + "%";


            masteryBar.appendChild(
                masteryFill
            );

            resultBox.appendChild(
                masteryBar
            );


            masteryResultsContainer.appendChild(
                resultBox
            );
        }
    );


    console.log(
        "Mastery Results:",
        masteryResults
    );
}
