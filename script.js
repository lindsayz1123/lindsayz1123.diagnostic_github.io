// Get HTML elements
const topicInput = document.getElementById("topic");
const continueButton = document.getElementById("continueButton");
const section = document.querySelector("section");


// Get all unique units from the question bank
const units = [...new Set(questionBank.map(question => question.unit))];


// Keep track of where the student is
let currentUnitIndex = 0;
let currentDifficulty = "easy";


// Store mastery results
let masteryResults = {};


// Start diagnostic
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
    masteryResults = {};

    showQuestion();
});


// Find and display the correct question
function showQuestion() {

    // If all units are finished, show results
    if (currentUnitIndex >= units.length) {
        showResults();
        return;
    }

    const currentUnit = units[currentUnitIndex];


    // Find the question matching the unit and difficulty
    const question = questionBank.find(function (q) {
        return (
            q.unit === currentUnit &&
            q.difficulty === currentDifficulty
        );
    });


    // Clear previous content
    section.innerHTML = "";


    // Show unit progress
    const progress = document.createElement("p");

    progress.textContent =
        "Unit " +
        (currentUnitIndex + 1) +
        " of " +
        units.length;

    section.appendChild(progress);


    // Show unit name
    const unitTitle = document.createElement("h3");

    unitTitle.textContent = currentUnit;

    section.appendChild(unitTitle);


    // Show difficulty
    const difficultyText = document.createElement("p");

    difficultyText.textContent =
        "Difficulty: " + currentDifficulty;

    section.appendChild(difficultyText);


    // Show question
    const questionText = document.createElement("h2");

    questionText.textContent = question.question;

    section.appendChild(questionText);


    // Create answer buttons
    question.choices.forEach(function (choice, index) {

        const button = document.createElement("button");

        button.textContent = choice;
        button.className = "answer-button";

        button.addEventListener("click", function () {
            checkAnswer(index, question);
        });

        section.appendChild(button);
    });
}


// Check the answer and decide what happens next
function checkAnswer(selectedAnswer, question) {

    const isCorrect =
        selectedAnswer === question.correctAnswer;

    const currentUnit = units[currentUnitIndex];


    // -------------------------
    // EASY QUESTION
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
    // MEDIUM QUESTION
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
    // DIFFICULT QUESTION
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


// Move to the easy question of the next unit
function moveToNextUnit() {

    currentUnitIndex++;

    currentDifficulty = "easy";

    showQuestion();
}


// Show all mastery results
function showResults() {

    section.innerHTML = "";


    const title = document.createElement("h2");

    title.textContent = "Your Java Mastery";

    section.appendChild(title);


    const description = document.createElement("p");

    description.textContent =
        "Your diagnostic is complete. Here is your mastery for each unit.";

    section.appendChild(description);


    // Display every unit
    units.forEach(function (unit) {

        const mastery = masteryResults[unit];


        // Container for one result
        const resultBox = document.createElement("div");

        resultBox.className = "result-box";


        // Unit name
        const unitName = document.createElement("h3");

        unitName.textContent = unit;

        resultBox.appendChild(unitName);


        // Mastery percentage
        const masteryText = document.createElement("p");

        masteryText.textContent =
            mastery + "% Mastery";

        resultBox.appendChild(masteryText);


        // Mastery bar
        const masteryBar = document.createElement("div");

        masteryBar.className = "mastery-bar";


        const masteryFill = document.createElement("div");

        masteryFill.className = "mastery-fill";

        masteryFill.style.width =
            mastery + "%";


        masteryBar.appendChild(masteryFill);

        resultBox.appendChild(masteryBar);

        section.appendChild(resultBox);
    });
}