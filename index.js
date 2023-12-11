var userClickedPattren = [];

var gamePattren = [];

var buttonColor = ["red", "blue", "yellow", "green"];

var started = false;
var level = 0;

$(document).on('touchstart', function () {
    if (!started) {
        $("#level-title").text(level + "مرحلة ");
        nextSequence();
        started = true;
    }
});

function checkAnswer(currentLevel) {
    
    if (gamePattren[currentLevel] === userClickedPattren[currentLevel]) {
        console.log("success");
        if (gamePattren.length === userClickedPattren.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout( function() {
        $("body").removeClass("game-over");
        }, 200);
        
        $("#level-title").text("لقد خسرت، اضغط اي مكان في الشاشة للبدء");

        startOver();
    }
}

function nextSequence() {
    userClickedPattren = [];

    level++;
    $("#level-title").text(level + "مرحلة ");

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColor[randomNumber];
    gamePattren.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}


$(".btn").click( function () {

    var userChosenColor = $(this).attr("id");
    userClickedPattren.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattren.length-1);

})

function startOver() {
    started = false;
    level = 0;
    gamePattren = [];
    
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(name) {
    $("#" + name ).addClass("pressed");
    setTimeout(function () {
        $("#" + name ).removeClass("pressed");
    }, 100);
}



