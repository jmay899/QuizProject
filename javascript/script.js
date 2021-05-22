//constants
const startButton = document.querySelector(".startButton button");
const intro = document.querySelector(".intro");
const restartButton = intro.querySelector(".buttons .startNew");
const quitButton = intro.querySelector(".buttons .quit");
const quizMain = document.querySelector(".quizMain");
const optionList = document.querySelector(".optionList");

//Start quiz
startButton.onclick = ()=> {
  intro.classList.add("activeIntro");
}

//Exit quiz
quitButton.onclick = ()=> {
  intro.classList.remove("activeIntro");
}

//Start new quiz
restartButton.onclick = ()=> {
  intro.classList.remove("activeIntro");
  quizMain.classList.add("activeQuiz");
  showQuestion(0);
  questionCounter(1);
}

let questionCount = 0;
let userScore = 0;

const nextButton = quizMain.querySelector(".nextButton");
const resultsBox = document.querySelector(".resultsBox");
const restartQuiz = resultsBox.querySelector(".buttons .startNew");
const quitQuiz = resultsBox.querySelector(".buttons .quit");

quitQuiz.onclick = ()=> {
  window.location.reload();
}

restartQuiz.onclick =()=> {
  resultsBox.classList.remove("activeResult");
  quizMain.classList.add("activeQuiz");
  questionCount = 0;
  userScore = 0;
  showQuestion(0);
  questionCounter(1);
  nextButton.classList.add("activeNextButton");
}

nextButton.onclick =()=> {
  if(questionCount < questions.length - 1) {
    nextButton.classList.remove("activeNextButton");
    questionCount++;
    showQuestion(questionCount);
    questionCounter(questionCount+1);
  }
  else {
    //display results page
    showResultBox();
  }
}

//Getting question data
function showQuestion(questionNum) {
  const questionText = document.querySelector(".questionText");

  let questionTag =   '<span>'+ questions[questionNum].question +'</span>';
  let optionTag =   '<div class="option">'+questions[questionNum].options[0]+'<span></span></div>'
                    + '<div class="option">'+questions[questionNum].options[1]+'<span></span></div>'
                    + '<div class="option">'+questions[questionNum].options[2]+'<span></span></div>'
                    + '<div class="option">'+questions[questionNum].options[3]+'<span></span></div>';

  questionText.innerHTML = questionTag;
  optionList.innerHTML = optionTag;
  const option = optionList.querySelectorAll(".option");
  for(let i=0; i<option.length;i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if(userAnswer == correctAnswer) {
    userScore++;
    console.log("correct")
    answer.classList.add("correct");
  }
  else {
    console.log("incorrect");
    answer.classList.add("incorrect");
    //highlight correct answer if user is incorrect
    for(let i=0; i<allOptions;i++)
      if(optionList.children[i].textContent == correctAnswer)
        optionList.children[i].setAttribute("class", "option correct");
  }

  //disable other options once user selects one
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  //allow user to go to next question after answered
  nextButton.classList.add("activeNextButton");

}

function showResultBox() {
  intro.classList.remove("activeIntro");
  quizMain.classList.remove("activeQuiz");
  resultsBox.classList.add("activeResult");
  const scoreText = resultsBox.querySelector(".scoreText");
  const scorePercent = (userScore / questions.length) * 100;

  let scoreTag = '<span>Score: <p>'+ userScore + '</p>out of<p>' + questions.length + '</p>(<b>' + scorePercent + '%</b>)</span>';
  scoreText.innerHTML = scoreTag;
}

function questionCounter(index) {
  const bottomQuestionCounter = quizMain.querySelector(".totalQuestionNum");
  let bottomQuestionCounterTag = '<span>Question<p>' + index + '</p> of <p>' + questions.length + '</p></span>';
  bottomQuestionCounter.innerHTML = bottomQuestionCounterTag;
}
