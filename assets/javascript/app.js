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
var timer = 20;
var intervalID;

function runTimer(){
	intervalID = setInterval(function () {
		timer --;
		$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
		}, 1000)}


runTimer();
