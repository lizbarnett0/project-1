////////////Variables//////////////

//Scoring & Other Tracking Variables
let score = 0;
const hard = 20;
const medium = 10;
const easy = 5;
let questionIndex = 0;
let currentUsername = '';

//Document element selectors Welcome Area Section
const username = document.getElementById('username-input');
const letsPlayButton = document.querySelector('#lets-play-button');
const welcomeArea = document.querySelector('.welcome-area');

//Document element selectors Gameplay - Question Div
const gameplayArea = document.querySelector('.gameplay-area');
const nextButton = document.querySelector('#next-button');
const scoreDisplay = document.querySelector('#current-score');
const questionNumDisplay = document.querySelector('#question-number');
const difficultyDisplay = document.querySelector('#difficulty-level');
const pointValueDisplay = document.querySelector('#point-value');
const categoryDisplay = document.querySelector('#category');
const questionTextDisplay = document.querySelector('#question-text');

//Document element selectors Gameplay - Answers Div
const answersDisplayArea = document.querySelector('.answer-area');
const answerMessage = document.querySelector('#answer-message');
const allAnswerButtons = document.querySelectorAll('.answer-button');
const answerButtonA = document.querySelector('#answer-a');
const answerButtonB = document.querySelector('#answer-b');
const answerButtonC = document.querySelector('#answer-c');
const answerButtonD = document.querySelector('#answer-d');

//Document element selectors game-over
const gameOverDisplayArea = document.querySelector('.game-over')
const newGameButton = document.querySelector('#new-game-button')
const finalScore = document.querySelector('#final-score')
const gameOverMessage = document.querySelector("#game-over-message")

//////////Initial Game State///////////////
nextButton.style.display = 'none';
answersDisplayArea.style.display = 'none'
gameplayArea.style.display = 'none';
gameOverDisplayArea.style.display = 'none';
newGameButton.style.display = 'none';

////////////Event Handlers//////////////

//Grabbing Elements
const instructionsButton = document.getElementById('openInstructionsModal');
const instructionsModal = document.getElementById('instructionsModal');
const close = document.getElementById('close')

//Functions
const openModal = () => {
  instructionsModal.style.display = 'block';
}

const closeModal = () => {
  instructionsModal.style.display = 'none';
}

//Event Listeners
instructionsButton.addEventListener('click', openModal);
close.addEventListener('click', closeModal)



//Event handler for the Let's Play button that is click after entering a name.  It stores the username, then triggers the begining of the game.
letsPlayButton.addEventListener('click', (event) => {
	// 	event.preventDefault();
	currentUsername = username.value;
	if (currentUsername === '' || currentUsername === username.placeholder) {
		return alert('You must enter a username to continue!');
	} else {
		gameplayArea.style.display = 'block';
		answersDisplayArea.style.display = 'block';
		gameStart();
	}
});

//Event handler for 'Next' Button - will go to the next question
nextButton.addEventListener('click', (event) => {
	event.preventDefault();
	answersDisplayArea.setAttribute('data-correct', '');
	answerButtonA.disabled = false;
	answerButtonA.style.backgroundColor = 'lightGray';
	answerButtonB.disabled = false;
	answerButtonB.style.backgroundColor = 'lightGray';
	answerButtonC.disabled = false;
	answerButtonC.style.backgroundColor = 'lightGray';
	answerButtonD.disabled = false;
	answerButtonD.style.backgroundColor = 'lightGray';
	answerMessage.innerText = '';

	questionIndex++;
	if (questionIndex < 10) {
		askQuestionAPI();
	} else {
		gameOverDisplayArea.style.display = 'inline';
		gameOver();
	}
});

//Event handler for selecting answer button click
answersDisplayArea.addEventListener('click', (event) => {
	event.preventDefault();
	if (event.target.tagName === 'BUTTON') {
		gradeAnswerAPI(event);
		answerButtonA.disabled = true;
		answerButtonB.disabled = true;
		answerButtonC.disabled = true;
		answerButtonD.disabled = true;
	}
});

newGameButton.addEventListener('click',(event) => {
	questionIndex = 0;
	score = 0;
	gameOverDisplayArea.style.display = 'none';
	gameplayArea.style.display = 'block';
	answersDisplayArea.style.display = 'block';
	gameStart();
})


////////////Functions//////////////

//Begins the gameplay by setting current user name to the input value, resets the score, clears the welcome/instructions screen, and triggers the first question
function gameStart() {
	questionIndex = 0;
	score = 0;
	welcomeArea.innerHTML = '';
	askQuestionAPI();
}

//Triggers the Game Over Screen once 10 questions have been asked
function gameOver() {
	gameplayArea.style.display = 'none';
	gameOverDisplayArea.style.display = 'block'
	newGameButton.style.display = 'block';
	finalScore.innerText = `${currentUsername}'s Final Score is ${score}`;
	if (score < 30) {
		gameOverMessage.innerText = 'That wasn\'t a great round...keep working at it.'
	} else if (score < 70) {
		gameOverMessage.innerText = 'Pretty good work, keep it up!';
	} else {
		gameOverMessage.innerText = 'Look at the big brain on you! \nGenius Level. \nGreat job!';
	}
}



//Function to Decode HTML in from Trivia Database
//Source for this code: gomakethings.com/decoding-html-entities-with-vanilla-javascript/
const decodeHTML = function (html) {
	const txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
};

//////////////API Integration/////////////

//API Variables
const url = `https://opentdb.com/api.php?amount=1&type=multiple`;


//API Functions
function askQuestionAPI() {
	nextButton.style.display = 'none';
	questionNumDisplay.innerText = `Question ${questionIndex + 1}`;
	scoreDisplay.innerHTML = `${currentUsername}'s Score: ${score}`;

	if (questionIndex < 5) {
		fetch(`${url}&difficulty=easy`)
			.then((res) => res.json())
			.then((resJson) => {
				difficultyDisplay.innerText = `Difficulty: ${resJson.results[0].difficulty.toUpperCase()}`;
				categoryDisplay.innerText = `${resJson.results[0].category}`;
				questionTextDisplay.innerText = decodeHTML(resJson.results[0].question);
				answersDisplayArea.setAttribute('data-correct', resJson.results[0].correct_answer);
				console.log(answersDisplayArea)
				answerAssignmentAPI(resJson);

				console.log(resJson)
			});
	} else if (questionIndex < 8) {
		fetch(`${url}&difficulty=medium`)
			.then((res) => res.json())
			.then((resJson) => {
				difficultyDisplay.innerText = `Difficulty: ${resJson.results[0].difficulty.toUpperCase()}`;
				categoryDisplay.innerText = `${resJson.results[0].category}`;
				questionTextDisplay.innerText = decodeHTML(resJson.results[0].question);
				answerAssignmentAPI(resJson);
				console.log(resJson);
			});
	} else {
		fetch(`${url}&difficulty=hard`)
			.then((res) => res.json())
			.then((resJson) => {
				difficultyDisplay.innerText = `Difficulty: ${resJson.results[0].difficulty.toUpperCase()}`;
				categoryDisplay.innerText = `${resJson.results[0].category}`;
				questionTextDisplay.innerText = decodeHTML(resJson.results[0].question);
				answerAssignmentAPI(resJson);	
				console.log(resJson);
			});
	}
	
}

//Assign answers from API question
function answerAssignmentAPI(resJson) {
	let answersArrIndex = [0, 1, 2, 3];
	let arrStartIndex1;
	let arrStartIndex2;
	let arrStartIndex3;
	let tempIndex;
	answersDisplayArea.setAttribute('data-correct',resJson.results[0].correct_answer);
	answerButtonA.setAttribute('data-answer','')
	answerButtonB.setAttribute('data-answer', '');
	answerButtonC.setAttribute('data-answer','')
	answerButtonD.setAttribute('data-answer', '');

	arrStartIndex1 = Math.floor(Math.random() * answersArrIndex.length);
	tempIndex = answersArrIndex[arrStartIndex1];
	

	if (tempIndex === 3) {
		answerButtonA.innerText = decodeHTML(resJson.results[0].correct_answer);
		answerButtonA.setAttribute('data-answer','correct')
	} else {
		answerButtonA.innerText = decodeHTML(resJson.results[0].incorrect_answers[tempIndex]);
		answerButtonA.setAttribute('data-answer', 'incorrect');
	}
	answersArrIndex.splice(arrStartIndex1, 1);

	arrStartIndex2 = Math.floor(Math.random() * answersArrIndex.length);
	tempIndex = answersArrIndex[arrStartIndex2];
	
	if (tempIndex === 3) {
		answerButtonB.innerText = decodeHTML(resJson.results[0].correct_answer);
		answerButtonB.setAttribute('data-answer', 'correct');
	} else {
		answerButtonB.innerText = decodeHTML(resJson.results[0].incorrect_answers[tempIndex]);
		answerButtonB.setAttribute('data-answer', 'incorrect');
	}
	answersArrIndex.splice(arrStartIndex2, 1);

	arrStartIndex3 = Math.floor(Math.random() * answersArrIndex.length);
	tempIndex = answersArrIndex[arrStartIndex3];
	if (tempIndex === 3) {
		answerButtonC.innerText = decodeHTML(resJson.results[0].correct_answer);
		answerButtonC.setAttribute('data-answer', 'correct');
	} else {
		answerButtonC.innerText = decodeHTML(resJson.results[0].incorrect_answers[tempIndex]);
		answerButtonC.setAttribute('data-answer', 'incorrect');
	}
	answersArrIndex.splice(arrStartIndex3, 1);

	tempIndex = answersArrIndex[0];
	if (tempIndex === 3) {
		answerButtonD.innerText = decodeHTML(resJson.results[0].correct_answer);
		answerButtonD.setAttribute('data-answer', 'correct');
	} else {
		answerButtonD.innerText = decodeHTML(resJson.results[0].incorrect_answers[tempIndex]);
	}
	
}


//Grades Answer
function gradeAnswerAPI(event) {
	allAnswerButtons.disabled = true;
	console.log(event.target)
	if (event.target.dataset.answer === 'correct') {
		answerMessage.innerText = 'Wow, you are so smart! 🧠 ';
		event.target.style.backgroundColor = 'DarkSeaGreen';
		if (difficultyDisplay.innerText === 'Difficulty: HARD') {
			score += 20;
		} else if (difficultyDisplay.innerText === 'Difficulty: MEDIUM') {
			score += 10;
		} else if (difficultyDisplay.innerText === 'Difficulty: EASY') {
			score += 5;
		} else {
			score += 0;
		}
	} else {
		event.target.style.backgroundColor = 'PaleVioletRed';
		answerMessage.innerText = `NOPE!  The correct answer is: ${answersDisplayArea.dataset.correct} \nYou should really study some more! 📚 `
	}
	scoreDisplay.innerHTML = `${currentUsername}'s Score: ${score}`;
	nextButton.style.display = 'inline';
}
