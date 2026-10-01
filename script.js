// ==========================================
// GET HTML ELEMENTS
// ==========================================

const topicInput =
    document.getElementById("topic");

const continueButton =
    document.getElementById("continueButton");

const startScreen =
    document.getElementById("startScreen");

const quizScreen =
    document.getElementById("quizScreen");

const resultsScreen =
    document.getElementById("resultsScreen");

const unitName =
    document.getElementById("unitName");

const difficultyText =
    document.getElementById("difficulty");

const questionArea =
    document.getElementById("questionText");

const answerChoices =
    document.getElementById("answerChoices");

const submitButton =
    document.getElementById("submitButton");

const masteryResultsContainer =
    document.getElementById("masteryResults");


// ==========================================
// GET ALL UNITS
// ==========================================

const units = [
    ...new Set(
        questionBank.map(function (question) {
            return question.unit;
        })
    )
];


// ==========================================
// DIAGNOSTIC VARIABLES
// ==========================================

let currentUnitIndex = 0;

let currentDifficulty = "easy";

let currentQuestion = null;

let selectedAnswer = null;


// Simple mastery percentages
let masteryResults = {};


// Detailed diagnostic information
let diagnosticData = {};


// Final data for future AI
let studentProfile = {};


// ==========================================
// START DIAGNOSTIC
// ==========================================

continueButton.addEventListener(
    "click",
    function () {

        const topic =
            topicInput.value
                .trim()
                .toLowerCase();


        if (topic === "") {

            alert("Please enter a topic.");

            return;
        }


        if (topic !== "java") {

            alert(
                "For now, please enter Java."
            );

            return;
        }


        // Reset diagnostic
        currentUnitIndex = 0;

        currentDifficulty = "easy";

        currentQuestion = null;

        selectedAnswer = null;

        masteryResults = {};

        diagnosticData = {};

        studentProfile = {};


        // Change screens
        startScreen.classList.add(
            "hidden"
        );

        resultsScreen.classList.add(
            "hidden"
        );

        quizScreen.classList.remove(
            "hidden"
        );


        showQuestion();
    }
);


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    // Diagnostic finished
    if (currentUnitIndex >= units.length) {

        createStudentProfile();

        showResults();

        return;
    }


    const currentUnit =
        units[currentUnitIndex];


    // Find correct question
    currentQuestion =
        questionBank.find(
            function (question) {

                return (
                    question.unit ===
                        currentUnit &&

                    question.difficulty ===
                        currentDifficulty
                );
            }
        );


    // Safety check
    if (!currentQuestion) {

        console.error(
            "Question not found:",
            currentUnit,
            currentDifficulty
        );

        return;
    }


    selectedAnswer = null;


    // ==========================================
    // UNIT INFORMATION
    // ==========================================

    unitName.textContent =
        "Unit " +
        (currentUnitIndex + 1) +
        " of " +
        units.length +
        ": " +
        currentUnit;


    difficultyText.textContent =
        "Difficulty: " +
        currentDifficulty;


    // ==========================================
    // CLEAR PREVIOUS QUESTION
    // ==========================================

    questionArea.innerHTML = "";

    answerChoices.innerHTML = "";


    // ==========================================
    // QUESTION TEXT
    // ==========================================

    const questionHeading =
        document.createElement("h2");


    questionHeading.className =
        "question-text";


    questionHeading.textContent =
        currentQuestion.question;


    questionArea.appendChild(
        questionHeading
    );


    // ==========================================
    // CODE BOX
    // ==========================================

    if (currentQuestion.code) {

        const codeBlock =
            document.createElement("pre");


        codeBlock.className =
            "code-block";


        const code =
            document.createElement("code");


        code.textContent =
            currentQuestion.code;


        codeBlock.appendChild(code);


        questionArea.appendChild(
            codeBlock
        );
    }


    // ==========================================
    // ANSWER CHOICES
    // ==========================================

    currentQuestion.choices.forEach(
        function (choice, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                choice;


            button.className =
                "answer-button";


            button.addEventListener(
                "click",
                function () {

                    // Remove previous selection
                    const buttons =
                        document.querySelectorAll(
                            ".answer-button"
                        );


                    buttons.forEach(
                        function (answerButton) {

                            answerButton.classList.remove(
                                "selected"
                            );
                        }
                    );


                    // Highlight selected answer
                    button.classList.add(
                        "selected"
                    );


                    selectedAnswer =
                        index;
                }
            );


            answerChoices.appendChild(
                button
            );
        }
    );
}


// ==========================================
// SUBMIT ANSWER
// ==========================================

submitButton.addEventListener(
    "click",
    function () {

        if (selectedAnswer === null) {

            alert(
                "Please select an answer."
            );

            return;
        }


        checkAnswer(
            selectedAnswer,
            currentQuestion
        );
    }
);


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(
    selectedAnswer,
    question
) {

    const currentUnit =
        units[currentUnitIndex];


    const isCorrect =
        selectedAnswer ===
        question.correctAnswer;


    // ==========================================
    // CREATE UNIT DATA
    // ==========================================

    if (!diagnosticData[currentUnit]) {

        diagnosticData[currentUnit] = {

            questionsAttempted: 0,

            highestDifficultyReached:
                "easy",

            answers: [],

            mastery: 0
        };
    }


    // ==========================================
    // RECORD ANSWER
    // ==========================================

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


    // ==========================================
    // EASY QUESTION
    // ==========================================

    if (currentDifficulty === "easy") {

        if (!isCorrect) {

            masteryResults[currentUnit] =
                25;

            finishUnit(
                currentUnit
            );

            return;
        }


        currentDifficulty =
            "medium";


        showQuestion();

        return;
    }


    // ==========================================
    // MEDIUM QUESTION
    // ==========================================

    if (currentDifficulty === "medium") {

        if (!isCorrect) {

            masteryResults[currentUnit] =
                50;

            finishUnit(
                currentUnit
            );

            return;
        }


        currentDifficulty =
            "difficult";


        showQuestion();

        return;
    }


    // ==========================================
    // DIFFICULT QUESTION
    // ==========================================

    if (
        currentDifficulty ===
        "difficult"
    ) {

        if (isCorrect) {

            masteryResults[currentUnit] =
                100;

        } else {

            masteryResults[currentUnit] =
                75;
        }


        finishUnit(
            currentUnit
        );
    }
}


// ==========================================
// FINISH UNIT
// ==========================================

function finishUnit(unit) {

    diagnosticData[unit].mastery =
        masteryResults[unit];


    moveToNextUnit();
}


// ==========================================
// MOVE TO NEXT UNIT
// ==========================================

function moveToNextUnit() {

    currentUnitIndex++;

    currentDifficulty =
        "easy";

    selectedAnswer =
        null;


    showQuestion();
}


// ==========================================
// DETERMINE COURSE ACTION
// ==========================================

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


// ==========================================
// CREATE STUDENT PROFILE
// ==========================================

function createStudentProfile() {

    studentProfile = {

        subject: "Java",

        diagnosticCompleted:
            true,

        units: []
    };


    units.forEach(
        function (unit) {

            const data =
                diagnosticData[unit];


            studentProfile.units.push({

                unit:
                    unit,

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
        }
    );


    // This is the information
    // that can later be sent
    // to the AI course generator.

    console.log(
        "Student Profile:",
        studentProfile
    );
}


// ==========================================
// SHOW RESULTS
// ==========================================

function showResults() {

    quizScreen.classList.add(
        "hidden"
    );


    resultsScreen.classList.remove(
        "hidden"
    );


    masteryResultsContainer.innerHTML =
        "";


    studentProfile.units.forEach(
        function (result) {

            // ==================================
            // RESULT BOX
            // ==================================

            const resultBox =
                document.createElement(
                    "div"
                );


            resultBox.className =
                "result-box";


            // ==================================
            // UNIT NAME
            // ==================================

            const resultUnitName =
                document.createElement(
                    "h3"
                );


            resultUnitName.textContent =
                result.unit;


            resultBox.appendChild(
                resultUnitName
            );


            // ==================================
            // MASTERY
            // ==================================

            const masteryText =
                document.createElement(
                    "p"
                );


            masteryText.textContent =
                result.mastery +
                "% Mastery";


            resultBox.appendChild(
                masteryText
            );


            // ==================================
            // COURSE ACTION
            // ==================================

            const actionText =
                document.createElement(
                    "p"
                );


            actionText.className =
                "course-action";


            actionText.textContent =
                "Learning Path: " +
                result.courseAction;


            resultBox.appendChild(
                actionText
            );


            // ==================================
            // MASTERY BAR
            // ==================================

            const masteryBar =
                document.createElement(
                    "div"
                );


            masteryBar.className =
                "mastery-bar";


            const masteryFill =
                document.createElement(
                    "div"
                );


            masteryFill.className =
                "mastery-fill";


            masteryFill.style.width =
                result.mastery +
                "%";


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