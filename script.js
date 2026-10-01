// Find the input box
const topicInput = document.getElementById("topic");

// Find the Continue button
const continueButton = document.getElementById("continueButton");

// Run this code when the button is clicked
continueButton.addEventListener("click", function () {

    // Get whatever the user typed
    const topic = topicInput.value;

    // Check if the user entered something
    if (topic === "") {
        alert("Please enter a topic.");
    } else {
        alert("You want to learn: " + topic);
    }

});
