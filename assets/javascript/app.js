$(document).ready(function () {
var options = [
	{
		question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
		choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
		answer: 1,
		shown: false
	 },
	 {
	 	question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
		choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
		answer: 0,
		shown: false
	 }, 
	 {
	 	question: "Kopi luwak is a very expensive type of what?", 
		choice: ["Spice", "Caviar", "Coffee", "Rice variety" ],
		answer: 2,
		shown: false
	}, 
	{
		question: "Which is not an ingredient in a Harvey Wallbanger cocktail?", 
		choice: ["Orange Juice", "Vodka", "Sour Mix", "Galliano" ],
		answer: 2,
		shown: false
	}, 
	{
		question: "How many items are there in a Bakers' Dozen?", 
		choice: ["12", "6", "24", "13" ],
		answer: 3,
		shown: false
	}, 
	{
		question: "What is the most widely eaten fish in the world?", 
		choice: ["Tilapia", "Hering", "Sardine", "Tuna" ],
		answer: 1,
		shown: false
	}, 
	{
		question: "Which fruit does not ripen once it has been picked?", 
		choice: ["Banana", "Lemon", "Mango", "Apple" ],
		answer: 1,
		shown: false
	}, 
	{
		question: "Which fruit contains the most protein per 100 calories?", 
		choice: ["Guava", "Avocado", "Banana", "Blackberries" ],
		answer: 0,
		shown: false
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;

//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
	})
//timer start
function runTimer(){
	if (!running) {
	intervalID = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	timer --;
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		checkOver();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	var pick = options[Math.floor(Math.random()*options.length)]
	console.log(pick);
	if (pick.shown) {
		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
		displayQuestion();
	} else {
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
			//show that this question has been picked before
			pick.shown = true;		
		}
	}

//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));
	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		timer=20;
		correctCount++;
		checkOver();
	} else {
		timer=20;
		wrongCount++;
		checkOver();
	}
})

}


function checkOver() {
	if (unanswerCount + correctCount + wrongCount === options.length) {
		

	} else {
		$(".answerchoice").remove();
		displayQuestion();
	}

}

})