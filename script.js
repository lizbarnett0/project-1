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

//Scoring Variables
let score = 0;
const hard = 20;
const medium = 10;
const easy = 5

//Document elements selectors
const username = document.querySelector('input[type=text]');
const letsPlayButton = document.querySelector('#letsPlayButton');

//Document element creators
const questionNum = document.createElement('h1');
const questionDifficulty = document.createElement('span');
const questionPointValue = document.createElement('span');
const questionCategory = document.createElement('div');
const questionText =  document.createElement('div');
const answerChoices = document.createElement('div')
const scoreDisplay = document.createElement('div')



letsPlayButton.addEventListener('click', (event) => {
	event.preventDefault();
	console.log(username)
	if (username.value === '' || username.value === username.placeholder) {
		return alert('You need to enter a username to continue')
	} else {
		gameStart();
	}
})

function gameStart() {
	const currentUsername = username.value;
	console.log(currentUsername)
	score = 0;
	console.log(score);
	resetScreen();
	askQuestion();
}

function resetScreen() {
	document.body.innerHTML = '';
}

function askQuestion() {
	for (let i = 0; i < tenQuestionDatabase.length; i++) {
		questionNum.innerText = `Question ${i}`;
		questionDifficulty.innerText = tenQuestionDatabase[i].difficulty;
		questionCategory.innerText = tenQuestionDatabase[i].category;
		questionText.innerText =  tenQuestionDatabase[i].question
		answerChoices.innerText = `${tenQuestionDatabase[i].correct_answer} , ${tenQuestionDatabase[i].incorrect_answers[0]} ,${tenQuestionDatabase[i].incorrect_answers[1]}, ${tenQuestionDatabase[i].incorrect_answers[2]} `
		scoreDisplay.innerHTML = score
		if (tenQuestionDatabase[i].difficulty = 'hard') {
			questionPointValue.innerText = tostring(hard);
		} else if (tenQuestionDatabase[i].difficulty = 'medium') {
			questionPointValue.innerText = toString(medium);
		} else if (tenQuestionDatabase[i].difficulty = 'easy') {
			questionPointValue.innerText = toString(easy);
		} else {
			questionPointValue.innerText = '0';
		}
	}
}

function gradeAnswer() {
	
}