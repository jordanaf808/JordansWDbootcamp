


var numSquares = 6
//REFACTOR - reset() function will generate random colors. 
//REFACTOR - set colors to empty array or null.
var colors = []; //= generateRandomColors(numSquares);
//create array of random colors in this format
// colors = [
// 	"rgb(255, 0, 0)",
// 	"rgb(255, 255, 0)",
// 	"rgb(0, 255, 0)",
// 	"rgb(0, 255, 255)",
// 	"rgb(0, 0, 255)",
// 	"rgb(255, 0, 255)"
// 	];
//REFACTOR - set pickedColor to null;
var pickedColor; //= pickColor();
//moved document.Selector variables below
//up top we have 3 non selector variables.
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay")
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
//REFACTOR: consolidate duplicate code in buttons
// by making them the same class 
// var easyBtn = document.querySelector("#easyBtn");
// var hardBtn = document.querySelector("#hardBtn");
// assign them to a variable >
var modeButtons = document.querySelectorAll(".mode");


// run init() function at the beginning that runs everything 
// we need to load when someone visits the page
init();

function init(){
//REFACTOR into seperate functions
	setUpModeButtons();
	setUpSquares();
//REFACTOR: reset the screen >
	reset()
}

function setUpModeButtons(){
	//loop through mode buttons >
	for(var i = 0; i < modeButtons.length;i++){
		//add listener
		modeButtons[i].addEventListener("click", function(){
			//remove "selected" class from both buttons
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			// add "selected" class to only the button you clicked
			this.classList.add("selected");
			//figure out how many squares to show

	//REFACTOR: Ternary Operator
			// if text is equal to "easy" than squares = 3 otherwise squares = 6
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			//original code
			// if(this.textContent === "Easy"){
			// 	numSquares = 3;
			// } else {
			// 	numSquares = 6;
			// }

			reset();
			
			//pick new colors
			//pick a new pickedColor
			//update page to reflect changes
		});
	}
}

function setUpSquares(){
	for(var i = 0; i < squares.length; i++){
//REFACTOR use reset function to set colors
	//add click listeners to squares
	squares[i].addEventListener("click", function(){
		//grab color of clicked square
		var clickedColor = this.style.backgroundColor;
		//compare color to pickedColor
		if(clickedColor === pickedColor){
			messageDisplay.textContent = "Correct!";
			resetButton.textContent = "Play Again?"
			changeColors(clickedColor);
			h1.style.background = clickedColor
			} else {
			this.style.background = "#232323";
			messageDisplay.textContent = "Try Again..."
			}
		});
	}
}


//REFACTOR: create reset function
function reset(){
	colors = generateRandomColors(numSquares);
	//pick a new random color from 1-6
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors?"
	messageDisplay.textContent = "";
	//change colors of squares;
	for(var i = 0; i < squares.length; i++){
//REFACTOR: change numSquares to 3 or 6
	if(colors[i]){

		squares[i].style.display = "block";
	//add new colors to squares again
		squares[i].style.backgroundColor = colors[i];
	} else{
	//hide bottom squares in easy mode
		squares[i].style.display = "none";
	}
	
	} 
	h1.style.background = "steelblue";
	messageDisplay.textContent = "Pick A Color...";
	
}

// easyBtn.addEventListener("click", function(){
// 	easyBtn.classList.add("selected");
// 	hardBtn.classList.remove("selected");
// 	//define amount of squares
// 	numSquares = 3;
// 	//only generate (3) colors
// 	colors = generateRandomColors(numSquares);
// 	//pick one of those 3 colors
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor
// 	//loop through all the "squares" and check if they have NO color
// 	for(var i = 0; i < squares.length; i++){
// 		if(colors[i]){
// 			squares[i].style.background = colors[i];
// 		} else {
// 			squares[i].style.display = "none";
// 		}
// 	}
// 	messageDisplay.textContent = "Pick A Color..."
// });

// hardBtn.addEventListener("click", function(){
// 	hardBtn.classList.add("selected");
// 	easyBtn.classList.remove("selected");
// 	numSquares = 6;
// 	colors = generateRandomColors(numSquares);
// 	pickedColor = pickColor();
// 	colorDisplay.textContent = pickedColor
// 	for(var i = 0; i < squares.length; i++){
// 			squares[i].style.background = colors[i];
// 			squares[i].style.display = "block";
// 		}
// 	messageDisplay.textContent = "Pick A Color..."	
// });

resetButton.addEventListener("click", function(){
//REFACTOR with reset function.
	reset();	
	// //generate all new colors
	// colors = generateRandomColors(numSquares);
	// //pick a new random color from  1-6
	// pickedColor = pickColor();
	// //change colorDisplay to match picked color
	// colorDisplay.textContent = pickedColor;
	// this.textContent = "New Colors?"
	// //change colors of squares;
	// for(var i = 0; i < squares.length; i++){
	// //add new colors to squares again
	// squares[i].style.backgroundColor = colors[i];
	// };
	// h1.style.background = "steelblue";
	// messageDisplay.textContent = "Pick A Color...";
	
});

//REFACTOR - moved to reset() function.
//colorDisplay.textContent = pickedColor;

//REFACTOR copied into init() function.
// for(var i = 0; i < squares.length; i++){
// //REFACTOR: use reset function to add color to squares	
// 	// //add colors to squares
// 	//squares[i].style.backgroundColor = colors[i];

// 	//add click listeners to squares
// 	squares[i].addEventListener("click", function(){
// 		//grab color of clicked square
// 		var clickedColor = this.style.backgroundColor;
// 		//compare color to pickedColor
// 		if(clickedColor === pickedColor){
// 			messageDisplay.textContent = "Correct!";
// 			resetButton.textContent = "Play Again?"
// 			changeColors(clickedColor);
// 			h1.style.background = clickedColor
// 			} else {
// 			this.style.background = "#232323";
// 			messageDisplay.textContent = "Try Again..."
// 			}
// 	});
// }

function changeColors(color){
	// loop through all squares
	for(var i = 0; i < squares.length; i++){
	//change each color to match given color
	squares[i].style.background = color;
	}
}

function pickColor(){
	//pick a number between 1-6
	var random = Math.floor(Math.random() * colors.length)
	return colors[random];
}
	// "num" is an argument that you need to input to run this function >
	// this function will run "num" times.
function generateRandomColors(num){
	//make an array
	var arr = []
	//repeat 'num' times
	for(var i = 0; i < num; i++){
		//get random color and push into arr
		arr.push(randomColor())
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256)
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256)
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256)
	return"rgb(" + r + ", " + g + ", " + b + ")";
}

