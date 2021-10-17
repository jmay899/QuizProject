//constants
const startButton = document.querySelector(".startButton button");
const intro = document.querySelector(".intro");
const restartButton = intro.querySelector(".buttons .startNew");
const quitButton = intro.querySelector(".buttons .quit");
const dropdown = intro.querySelector(".dropdownButton");
const dropdownContent = intro.querySelector(".dropdown-content");
const quizMain = document.querySelector(".quizMain");
const optionList = document.querySelector(".optionList");
const questionList = document.querySelector(".questionList");

//Start quiz
startButton.onclick = ()=> {
    intro.classList.add("activeIntro");
    restartButton.disabled = true;
}

//Exit quiz
quitButton.onclick = ()=> {
    intro.classList.remove("activeIntro");
}

//Change quiz
function dropdownFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) { //close dropdown if clicked outside
	if (!event.target.matches('.dropdownButton')) {
		var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
		for (i=0;i<dropdowns.length;i++) {
			var openDropdown = dropdowns[i];
			if(openDropdown.classList.contains('show'))
				openDropdown.classList.remove('show');
		}
	}
}

let selectedQuiz = ""
dropdownContent.onclick = ()=> {
    restartButton.disabled = false;
}

function geohist() {
    selectedQuiz = "geohist";
    dropdown.textContent = "Geography/History";
}

function math() {
    selectedQuiz = "math";
    dropdown.textContent = "Math";
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
  nextButton.classList.remove("activeNextButton");
}

nextButton.onclick =()=> {
  if(questionCount < geographyHistoryQuestions.length - 1) {
    nextButton.classList.remove("activeNextButton");
    questionCount++;
    showQuestion(questionCount);
    questionCounter(questionCount+1);
  }
  else
    showResultBox();
}

//Getting question data
function showQuestion(questionNum) {
    const questionText = document.querySelector(".questionText");
    
    let questionTag = '';
    let optionTag = '';
    if (selectedQuiz == "geohist") {
        questionTag =   '<span>'+ geographyHistoryQuestions[questionNum].question +'</span>';
        optionTag =   '<div class="option">'+geographyHistoryQuestions[questionNum].options[0]+'<span></span></div>'
                        + '<div class="option">'+geographyHistoryQuestions[questionNum].options[1]+'<span></span></div>'
                        + '<div class="option">'+geographyHistoryQuestions[questionNum].options[2]+'<span></span></div>'
                        + '<div class="option">'+geographyHistoryQuestions[questionNum].options[3]+'<span></span></div>';
    }
    else if(selectedQuiz == "math") {
        questionTag =   '<span>'+ mathQuestions[questionNum].question +'</span>';
        optionTag =   '<div class="option">'+mathQuestions[questionNum].options[0]+'<span></span></div>'
                        + '<div class="option">'+mathQuestions[questionNum].options[1]+'<span></span></div>'
                        + '<div class="option">'+mathQuestions[questionNum].options[2]+'<span></span></div>'
                        + '<div class="option">'+mathQuestions[questionNum].options[3]+'<span></span></div>';
    }

    questionText.innerHTML = questionTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for(let i=0; i<option.length;i++)
        option[i].setAttribute("onclick", "optionSelected(this)");
}

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    
    let correctAnswer = ""
    if(selectedQuiz == "geohist")
        correctAnswer = geographyHistoryQuestions[questionCount].answer;
    else if(selectedQuiz == "math")
        correctAnswer = mathQuestions[questionCount].answer;
    
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
    for (let i = 0; i < allOptions; i++)
        optionList.children[i].classList.add("disabled");

    //allow user to go to next question after answered
    nextButton.classList.add("activeNextButton");
}

function showResultBox() {
  intro.classList.remove("activeIntro");
  quizMain.classList.remove("activeQuiz");
  resultsBox.classList.add("activeResult");
  const scoreText = resultsBox.querySelector(".scoreText");
  const scorePercent = (userScore / geographyHistoryQuestions.length) * 100;

  let scoreTag = '<span>Score: <p>'+ userScore + '</p>out of<p>' + geographyHistoryQuestions.length + '</p>(<b>' + scorePercent + '%</b>)</span>';
  scoreText.innerHTML = scoreTag;
}

function questionCounter(index) {
  const bottomQuestionCounter = quizMain.querySelector(".totalQuestionNum");
  let bottomQuestionCounterTag = '<span>Question<p>' + index + '</p> of <p>' + geographyHistoryQuestions.length + '</p></span>';
  bottomQuestionCounter.innerHTML = bottomQuestionCounterTag;
}
