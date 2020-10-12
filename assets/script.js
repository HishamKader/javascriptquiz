var questions = [
  {
    question: "Commonly used data types do not include:",
    choices: ["Strings", "Booleans", "Alerts", "Numbers"],
    answer: "Alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
    answer: "Parentheses",
  },
  {
    question: "Arrays in Javascript can be used to store :",
    choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "A very useful tool used durng devolopment and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "Terminal/bash", "For loops", "Console.log()"],
    answer: "Console.log()",
  },
  {
    question: "String values must be enclosed within ____ when being assigned to varibles.",
    choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
    answer: "Quotes",
  },
];


var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 60;
var intervalId;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
  setTimeout(showHighScore, 2);
}

function showHighScore() {
  var name = prompt("Please enter your name");

  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.textContent =
      "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  document.body.appendChild(contentUL);
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);