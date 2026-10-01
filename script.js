// Get elements from the HTML
const topicInput = document.getElementById("topic");
const continueButton = document.getElementById("continueButton");
const section = document.querySelector("section");

// Keep track of the diagnostic
let currentQuestion = 0;
let score = 0;


// When the user clicks Continue
continueButton.addEventListener("click", function () {

    const topic = topicInput.value.trim().toLowerCase();

    // Make sure the user entered something
    if (topic === "") {
        alert("Please enter a topic.");
        return;
    }

    // For now, our question bank only supports Java
    if (topic !== "java") {
        alert("For now, please enter Java.");
        return;
    }

    // Start the diagnostic
    currentQuestion = 0;
    score = 0;

    showQuestion();
});


// Display a question
function showQuestion() {

    // Check if we finished all questions
    if (currentQuestion >= questionBank.length) {
        showResults();
        return;
    }

    // Get the current question
    const question = questionBank[currentQuestion];

    // Clear the section
    section.innerHTML = "";

    // Create progress text
    const progress = document.createElement("p");
    progress.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questionBank.length;

    section.appendChild(progress);


    // Show unit
    const unit = document.createElement("p");
    unit.textContent =
        question.unit +
        " • " +
        question.difficulty;

    section.appendChild(unit);


    // Create the question
    const questionText = document.createElement("h2");
    questionText.textContent = question.question;

    section.appendChild(questionText);


    // Create a button for each answer
    question.choices.forEach(function (choice, index) {

        const answerButton = document.createElement("button");

        answerButton.textContent = choice;

        answerButton.className = "answer-button";

        answerButton.addEventListener("click", function () {
            checkAnswer(index);
        });

        section.appendChild(answerButton);
    });
}


// Check the student's answer
function checkAnswer(selectedAnswer) {

    const question = questionBank[currentQuestion];

    // Check if answer is correct
    if (selectedAnswer === question.correctAnswer) {
        score++;
    }

    // Move to next question
    currentQuestion++;

    showQuestion();
}


// Show final results
function showResults() {

    section.innerHTML = "";

    const title = document.createElement("h2");
    title.textContent = "Diagnostic Complete";

    section.appendChild(title);


    const result = document.createElement("p");

    result.textContent =
        "You answered " +
        score +
        " out of " +
        questionBank.length +
        " questions correctly.";

    section.appendChild(result);


    // Calculate percentage
    const percentage = Math.round(
        (score / questionBank.length) * 100
    );

    const percentageText = document.createElement("h3");

    percentageText.textContent =
        "Score: " + percentage + "%";

    section.appendChild(percentageText);
}