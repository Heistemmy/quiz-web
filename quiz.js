// Get DOM elements
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");
const resultDiv = document.getElementById("result");

// Quiz data
const questions = [
  {
    question: "What is  the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false },
    ],
  },
  {
    question: "Who is the most streamed Afrobeats Artist on SPOTIFY?",
    answers: [
      { text: "Burna Boy", correct: false }, 
      { text: "Wizkid", correct: false },
      { text: "Rema", correct: true },
      { text: "Davido", correct: false },
    ],
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answers: [
      { text: "function", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "both B and C", correct: true },
    ],
  },
  {
    question: "What does the console.log() function do?",
    answers: [
      { text: " Prompts the user for input", correct: false },
      { text: "Displays an alert box", correct: false },
      { text: " Logs messages to the console", correct: true },
      { text: "Prints a message on the webpage", correct: false },
    ],
  },
];


let shuffledQuestions, currentQuestionIndex, score;


startQuiz();

function startQuiz() {
  score = 0;
  questionContainer.style.display = "flex";
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  nextButton.classList.remove("hide");
  restartButton.classList.add("hide");
  resultDiv.classList.add("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;

  question.answers.forEach((answer, index) => {
    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "answer" + index;
    radio.name = "answer";
    radio.value = index;

    const label = document.createElement("label");
    label.htmlFor = "answer" + index;
    label.innerText = answer.text;

    inputGroup.appendChild(radio);
    inputGroup.appendChild(label);
    answerButtons.appendChild(inputGroup);
  });
}

function resetState() {
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

nextButton.addEventListener("click", () => {
  const answerIndex = Array.from(answerButtons.querySelectorAll("input")).findIndex(
    (radio) => radio.checked
  );

  if (answerIndex !== -1) {
    if (shuffledQuestions[currentQuestionIndex].answers[answerIndex].correct) {
      score++;
    }

    currentQuestionIndex++;

    if (shuffledQuestions.length > currentQuestionIndex) {
      setNextQuestion();
    } else {
      endQuiz();
    }
  } else {
    alert("Please select an answer.");
  }
});

restartButton.addEventListener("click", startQuiz);

function endQuiz() {
  questionContainer.style.display = "none";
  nextButton.classList.add("hide");
  restartButton.classList.remove("hide");
  resultDiv.classList.remove("hide");
  resultDiv.innerText = `Your final score: ${score} / ${shuffledQuestions.length}`;
}
