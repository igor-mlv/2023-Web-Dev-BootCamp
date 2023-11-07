// Array of button colors
var buttonColours = ["red", "blue", "green", "yellow"];

// Arrays to store the game pattern and user clicked pattern
var gamePattern = [];
var userClickedPattern = [];

// Variable to track game status
var started = false;
var level = 0;

// Event listener for key press to start the game
$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// Event listener for button clicks
$(".btn").click(function () {
    // Get the user-chosen color
    var userChosenColour = $(this).attr("id");
    // Add the chosen color to the userClickedPattern array
    userClickedPattern.push(userChosenColour);

    // Play sound and animate button press
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // Check user's answer against the game pattern
    checkAnswer(userClickedPattern.length - 1);
});

// Function to check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            // If the user has completed the pattern correctly, proceed to the next level
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        // If the user's answer is incorrect, play the wrong sound, display game over message, and restart the game
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Reset game variables
        startOver();
    }
}

// Function to generate the next color in the game sequence
function nextSequence() {
    // Reset userClickedPattern for the new level
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // Generate a random number and select a random color
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    // Add the chosen color to the game pattern
    gamePattern.push(randomChosenColour);

    // Animate and play sound for the selected color
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// Function to animate button press
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// Function to play sound for a specific color
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Function to reset game variables
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
