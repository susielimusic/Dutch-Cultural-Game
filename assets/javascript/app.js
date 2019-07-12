
// //welcome the user
alert("Welcome to test your CQ of the Netherlands!");

// view.hide(view.form);

function random(a, b, callback) {

    if (b === undefined) {
        // if only one argument is supplied, assume the lower limit is 1!
        b = a, a = 1;
    }
    var result = Math.floor((b - a + 1) * Math.random()) + a;

    if (typeof callback === "function") {
        result = callback(result);
    }

    return result;

}

//questions 
$(document).ready(function () {

var options = [
	{
		question: "Which month is the Tulip season?", 
		choice: ["December", "May", "August", "October"],
		answer: 1,
		photo: "assets/images/tulips.jpg"
	 },
	{
		question: "Where does Sinterklaas originate from?", 
		choice: ["North Pole", "Span", "Latvia", "Turkey"],
		answer: 1,
		photo: "assets/images/Sinterklaas.jpg"
	 },
	{
		question: "Why does the Dutch soccer team wear orange?", 
		choice: ["Symbol of the fruit of orange", "The Dutch royal color", "Symbol of orange jucie", "King's favorite color"],
		answer: 1,
		photo: "assets/images/football.jpg"
	 },
	 {
	 	question: "What is the name of the winner of the EuroVision song contest 2019?", 
		choice: ["Duncan", "David", "Dirk", " Adrianus"],
		answer: 0,
		photo: "assets/images/Duncan.jpg"
	 },
	 {
		question: "How many people in the world speak Dutch?", 
		choice: ["5 million", "12 million", "28 million", "55 million" ],
		answer: 2,
		photo: "assets/images/language.jpg"
	}, 
	{
		question: "Which brand of beer is Dutch?", 
		choice: ["Corona", "Calsberg", "Heineken", "Tsingtao" ],
		answer: 2,
		photo: "assets/images/beers.jpg"
	}, 
	{
		question: "How many provinces does the Netherlands have?", 
		choice: ["10", "11", "12", "13" ],
		answer: 2,
		photo: "assets/images/proviences.jpg"
	}, 
	{
		question: "What is the most widely eaten fish in the Netherlands?", 
		choice: ["Tilapia", "Herring", "Sardine", "Tuna" ],
		answer: 1,
		photo: "assets/images/herring.jpg"
	}, 
	{
		question: "What city is famous for its porcelain in Holland?", 
		choice: ["Amsterdam", "Delft", "Rotterdam", "Den Haag" ],
		answer: 1,
		photo: "assets/images/delftblue.jpg"
	}, 
	{
		question: "How tall is Dutch males in avarage?", 
		choice: ["175", "180", "185", "190" ],
		answer: 2,
		photo: "assets/images/tall.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 5;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#btn-reset").hide();
//click start button to start game
$("#btn-start").on("click", function () {
		$("#btn-start").hide();
		$("#frontline").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
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
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

	if (pick.shown) {
		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
		displayQuestion();
	} else {
		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
		}
}

//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html(`<p style="color:red; font-size:20px">Correct!</p>`);
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}

function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 5;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		document.createElement("div")
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
		$('#answerblock').append('<img src="./assets/images/correct.jpg"/>')
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
		$('#answerblock').append('<img src="./assets/images/incorrect.jpg"/>')
		// $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
		$("#btn-reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;
		
		$("#answerblock").css({
			display: "flex"
		})

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);
}

$("#btn-reset").on("click", function() {
	$("#btn-reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();
	})
})
