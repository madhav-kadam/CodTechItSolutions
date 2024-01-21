const questions = [
    {
        question:"What is the maximum number of players a cricket team can have on the field during a match?",
        answers:[
            {text: "10", correct: false},
            {text: "11", correct: true},
            {text: "12", correct: false},
            {text: "13", correct: false},
        ]
    },
    {
        question:"In cricket, what does LBW stand for?",
        answers:[
            {text: "Leg Before Wicket", correct: true},
            {text: "Leg Beyond Wicket", correct: false},
            {text: "Long Ball Wicket", correct: false},
            {text: "Leg Behind Wickets", correct: false},
        ]
    },
    {
        question:"Who holds the record for the highest individual score in a One Day International (ODI) cricket match?",
        answers:[
            {text: " Sachin Tendulkar", correct: false},
            {text: " Ricky Ponting", correct: false},
            {text: " Chris Gayle", correct: false},
            {text: " Rohit Sharma", correct: true},
        ]
    },
    {
        question:" Who was the highest run scorer in World Cup 2023?",
        answers:[
            {text: " Virat Kohli", correct: true},
            {text: " Quinton de Kock", correct: false},
            {text: " Glenn Maxwell", correct: false},
            {text: " Rohit Sharma", correct: false},
        ]
    },
    {
        question:" Which two teams played in the ICC Cricket World Cup Finale of 2023?",
        answers:[
            {text: " India and South Africa", correct: false},
            {text: " India and Pakistan", correct: false},
            {text: " India and Australia", correct: true},
            {text: " South Africa and Australia", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}


function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();