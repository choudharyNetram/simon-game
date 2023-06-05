
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [] ;
var userClickedPattern = [] ;

var started = false ; 
var level = 0 ; 
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level) ;
        nextSequence() ;
        started = true ; 
    }
});

//1. Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    //2. Inside the handler, create a new variable called userChosenColour to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
  
    //4. Add the contents of the variable userChosenColour created in step 2 to the end of this new userClickedPattern
    userClickedPattern.push(userChosenColour);
  
    // console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });
  

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function(){
        nextSequence() ;
      }, 1000) ; 
    }
  }
    
  else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}  

function startOver(){
  level = 0 ;
  gamePattern = [] ; 
  started  = false ; 
}
function nextSequence(){
    userClickedPattern = [] ;
    level++; 
    $("#level-title").text("Level "+level) ; 
    var randomNumber = Math.random() ;
    randomNumber = Math.floor(4*randomNumber) ;
    var randomChosenColour = buttonColours[randomNumber] ;
    gamePattern.push(randomChosenColour) ;
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour) ;
}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

/* one another method to add a class remove it 
  $("."+currentColour).addclass("pressed").delay(100).removeClass("pressed") ; 
*/   


