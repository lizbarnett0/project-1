//Source of static database questions is opentdb.com
const tenQuestionDatabase = [
	{
		category: 'Entertainment: Music',
		correct_answer: '12',
		difficulty: 'easy',
		incorrect_answers: ['19', '21', '25'],
		question:
			'Which of these is NOT the name of an album released by English singer-songwriter Adele?',
		type: 'multiple',
	},
	{
		category: 'Science: Gadgets',
		correct_answer: '1996',
		difficulty: 'easy',
		incorrect_answers: ['1989', '1992', '1990'],
		question: 'When was the Tamagotchi digital pet released?',
		type: 'multiple',
	},
	{
		category: 'Entertainment: Cartoon & Animations',
		correct_answer: 'Gary',
		difficulty: 'easy',
		incorrect_answers: ['Orvillie', 'Squidward', 'Squidette'],
		question:
			"Which of these characters from 'SpongeBob SquarePants' is not a squid?",
		type: 'multiple',
	},
	{
		category: 'Geography',
		correct_answer: 'Edinburgh',
		difficulty: 'easy',
		incorrect_answers:['Glasgow', 'Dundee', 'London'],
		question: 'What is the capital of Scotland?',
		type: 'multiple',
	},
	{
		category: 'General Knowledge',
		correct_answer: '2,722 ft',
		difficulty: 'easy',
		incorrect_answers:['2,717 ft', '2,546 ft', '3,024 ft'],
		question: 'How tall is the Burj Khalifa?',
		type: 'multiple',
	},
	{
		category: "History",
		correct_answer: "Delaware",
		difficulty: "medium",
		incorrect_answers: ["Rhode Island", "Maine", "Virginia"],
		question: "What is the oldest US state?",
		type: "multiple"
	},
	{
		category: "Geography",
		correct_answer: "Suriname",
		difficulty: "medium",
		incorrect_answers: ["Brazil", "Uruguay", "Chile"],
		question: "What is the smallest country in South America by area?",
		type: "multiple"
	},
	{
		category: "Entertainment: Film",
		correct_answer: "From Dusk till Dawn",
		difficulty: "medium",
		incorrect_answers: ["Jackie Brown", "Pulp Fiction", "Reservoir Dogs"],
		question: "Which of the following films was NOT directed by Quentin Tarantino?",
		type: "multiple"
	},
	{		
		category: "Animals",
		correct_answer: "Melopsittacus undulatus",
		difficulty: "hard",
		incorrect_answers: ["Nymphicus hollandicus", "Pyrrhura molinae", "Ara macao"],
		question: "What is the scientific name of the Budgerigar?",
		type: "multiple"},
	{
		category: "Science: Mathematics",
		correct_answer: "Bertrand Russel",
		difficulty: "hard",
		incorrect_answers: ["Francis Bacon", "John Locke", "Alfred North Whitehead"],	
		question: "The notion of a 'set that contains all sets which do not contain themselves' is a paradoxical idea attributed to which English philospher?",
		type: "multiple"
	}
];


////////////Variables//////////////

//Scoring & Other Tracking Variables
let score = 0;
const hard = 20;
const medium = 10;
const easy = 5;
let questionIndex;

//Document element selectors
const username = document.querySelector('input[type=text]');
const letsPlayButton = document.querySelector('#letsPlayButton');

//Document element creators
const questionNumDisplay = document.createElement('h1');
const difficultyDisplay = document.createElement('span');
const pointValueDisplay = document.createElement('span');
const categoryDisplay = document.createElement('div');
const questionTextDisplay =  document.createElement('div');
const answerChoicesDisplay = document.createElement('div')
const scoreDisplay = document.createElement('div')
const nextButton = document.createElement('button')


////////////Event Handlers//////////////

//Event handler for the Let's Play button that is click after entering a name.  It triggers the begining of the game.
letsPlayButton.addEventListener('click', (event) => {
	event.preventDefault();
	console.log(username)
	if (username.value === '' || username.value === username.placeholder) {
		return alert('You need to enter a username to continue')
	} else {
		gameStart();
	}
})

//Event handler for 'Next' Button - will go to the next question
nextButton.addEventListener('click', (event) => {
	event.preventDefault();
	if (username.value === '' || username.value === username.placeholder) {
		return alert('You need to enter a username to continue');
	} else {
		gameOver();
	}
});

//Event handler for selecting answer button click












////////////Functions//////////////

//Begins the gameplay by setting current user name to the input value, resets the score, clears the welcome/instructions screen, and triggers the first question
function gameStart() {
	const currentUsername = username.value;
	score = 0;
	resetScreen();
	askQuestion();
	questionIndex = 0;
}

//Resets the screen to blank
function resetScreen() {
	document.body.innerHTML = '';
}

//Pulls a question from the database and displays it and all relevant characteristics on the screen.
function askQuestion() {
	//set all of the inner text of the document elements to current question
	questionNumDisplay.innerText = `Question OPEN`;
	difficultyDisplay.innerText = `Difficulty: ${tenQuestionDatabase[questionIndex].difficulty}`;
	categoryDisplay.innerText = `Category: ${tenQuestionDatabase[questionIndex].category}`;
	questionTextDisplay.innerText =  tenQuestionDatabase[questionIndex].question
	answerChoicesDisplay.innerText = `
	\n${tenQuestionDatabase[questionIndex].correct_answer}  
	\n${tenQuestionDatabase[questionIndex].incorrect_answers[0]} 
	\n${tenQuestionDatabase[questionIndex].incorrect_answers[1]} 
	\n${tenQuestionDatabase[questionIndex].incorrect_answers[2]}`;
	scoreDisplay.innerHTML = `Score: ${score}`
	if ((tenQuestionDatabase[questionIndex].difficulty = 'hard')) {
		pointValueDisplay.innerText = hard.toString();
	} else if ((tenQuestionDatabase[questionIndex].difficulty = 'medium')) {
		pointValueDisplay.innerText = medium.toString();
	} else if ((tenQuestionDatabase[questionIndex].difficulty = 'easy')) {
		pointValueDisplay.innerText = easy.toString();
	} else {
		pointValueDisplay.innerText = 'N/A';
	}
	//Append question elements to the body
	document.body.appendChild(questionNumDisplay)
	document.body.appendChild(difficultyDisplay);
	document.body.appendChild(pointValueDisplay);
	document.body.appendChild(categoryDisplay);
	document.body.appendChild(questionTextDisplay);
	document.body.appendChild(answerChoicesDisplay);
	document.body.appendChild(scoreDisplay);
}







function gradeAnswer() {
	
}

function gameOver() {
	
}