const quizData = [
    {
        question: "Which country won the FIFA World Cup in 2022?",
        options: ["Argentina", "France", "Brazil", "Germany"],
        answer: "Argentina"
    },
    {
        question: "What is the SI unit of force?",
        options: ["Joule", "Pascal", "Newton", "Watt"],
        answer: "Newton"
    },
    {
        question: "Who holds the record for the most Olympic gold medals?",
        options: ["Usain Bolt", "Michael Phelps", "Mark Spitz", "Carl Lewis"],
        answer: "Michael Phelps"
    },
    {
        question: "What is the function of a capacitor in an electric circuit?",
        options: ["Resist current", "Store electrical energy", "Increase voltage", "Convert AC to DC"],
        answer: "Store electrical energy"
    },
    {
        question: "In which sport is the term 'love' used for a score of zero?",
        options: ["Badminton", "Tennis", "Squash", "Golf"],
        answer: "Tennis"
    },
    {
        question: "What is the main purpose of a heat exchanger in thermal engineering?",
        options: ["To cool air", "To transfer heat", "To create pressure", "To remove particles"],
        answer: "To transfer heat"
    },
    {
        question: "How many players are there in a soccer team on the field?",
        options: ["9", "10", "11", "12"],
        answer: "11"
    },
    {
        question: "What is Ohm's Law?",
        options: ["V = IR", "P = IV", "E = mc^2", "F = ma"],
        answer: "V = IR"
    },
    {
        question: "Which cricket player is known as the 'Master Blaster'?",
        options: ["MS Dhoni", "Ricky Ponting", "Virat Kohli", "Sachin Tendulkar"],
        answer: "Sachin Tendulkar"
    },
    {
        question: "Which type of engineering deals with circuit design?",
        options: ["Mechanical", "Civil", "Electrical", "Chemical"],
        answer: "Electrical"
    },
    {
        question: "Which country has won the most Olympic medals overall?",
        options: ["China", "Germany", "Russia", "USA"],
        answer: "USA"
    },
    {
        question: "What does a diode do in an electronic circuit?",
        options: ["Stores energy", "Allows current in one direction", "Generates electricity", "Amplifies signal"],
        answer: "Allows current in one direction"
    },
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Mars", "Venus", "Mercury"],
        answer: "Mars"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let timeLeft = 15;
let timer;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const resultsElement = document.getElementById('results');
const scoreElement = document.getElementById('score');
const reviewElement = document.getElementById('review');
const restartButton = document.getElementById('restart-btn');

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionElement.textContent = q.question;
    optionsElement.innerHTML = '';
    q.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.classList.add('option');
        div.textContent = option;
        div.addEventListener('click', () => selectOption(option));
        optionsElement.appendChild(div);
    });
    startTimer();
}

function selectOption(option) {
    clearInterval(timer);
    userAnswers[currentQuestion] = option;
    const options = optionsElement.children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
        if (options[i].textContent === option) {
            options[i].classList.add('selected');
            options[i].classList.add(option === quizData[currentQuestion].answer ? 'correct' : 'incorrect');
        }
        if (options[i].textContent === quizData[currentQuestion].answer) {
            options[i].classList.add('correct');
        }
        options[i].style.pointerEvents = 'none';
    }
    if (option === quizData[currentQuestion].answer) {
        score++;
    }
    nextButton.style.display = 'block';
}

function startTimer() {
    timeLeft = 15;
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            userAnswers[currentQuestion] = null;
            const options = optionsElement.children;
            for (let i = 0; i < options.length; i++) {
                if (options[i].textContent === quizData[currentQuestion].answer) {
                    options[i].classList.add('correct');
                }
                options[i].style.pointerEvents = 'none';
            }
            nextButton.style.display = 'block';
        }
    }, 1000);
}

function showResults() {
    questionElement.style.display = 'none';
    optionsElement.style.display = 'none';
    timerElement.style.display = 'none';
    nextButton.style.display = 'none';
    resultsElement.style.display = 'block';
    scoreElement.textContent = `Your score: ${score} out of ${quizData.length}`;
    reviewElement.innerHTML = '';
    quizData.forEach((q, index) => {
        const div = document.createElement('div');
        div.classList.add('result-item');
        div.innerHTML = `
            <strong>Question ${index + 1}: ${q.question}</strong><br>
            Your answer: ${userAnswers[index] || 'No answer'}<br>
            Correct answer: ${q.answer}<br>
            ${userAnswers[index] === q.answer ? 'Correct' : userAnswers[index] ? 'Incorrect' : 'Time ran out'}
        `;
        reviewElement.appendChild(div);
    });
}

nextButton.addEventListener('click', () => {
    clearInterval(timer);
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
        nextButton.style.display = 'none';
    } else {
        showResults();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    resultsElement.style.display = 'none';
    questionElement.style.display = 'block';
    optionsElement.style.display = 'flex';
    timerElement.style.display = 'block';
    loadQuestion();
});

loadQuestion();
nextButton.style.display = 'none';
