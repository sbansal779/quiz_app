const question = [
    {
        question : "Which is the largest animal in the world?",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false}
        ]
    },
    {
        question : "Which is the smallest country in the world?",
        answer: [
            {text: "Vatican city", correct: true},
            {text: "Bhutan", correct: false},
            {text: "Nepal", correct: false},
            {text: "Shri lanka", correct: false}
        ]
    },
    {
        question : "Which is the largest desert in the world?",
        answer: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true}
        ]
    },
    {
        question : "Which is the smallest continent in the world?",
        answer: [
            {text: "Asia", correct: false},
            {text: "Austrelia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false}
        ]
    }
]

const questionelement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-buttons");
const nextbutton = document.getElementById("next-btn");

let currentquestionindex = 0;
let score = 0;

function startquiz(){
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next"
    showquesion();
}

function showquesion(){
    resetstate();
    let currentquestion = question[currentquestionindex];
    let questionno = currentquestionindex + 1;
    questionelement.innerHTML = questionno + ". " + currentquestion.question;
    currentquestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}

function resetstate() {
    nextbutton.style.display = "none";
    while(answerbuttons.firstChild){
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectanswer(e) {
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true"
    if(iscorrect)
    {
        selectbtn.classList.add("correct")
        score++;
    }else{
        selectbtn.classList.add("incorrect")
    }
    Array.from(answerbuttons.children).forEach(button=>{
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct")
        }
        button.disabled = true;
    })
    nextbutton.style.display = "block"
}

function showscore() {
    resetstate();
    questionelement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextbutton.innerHTML = "Play Again"
    nextbutton.style.display = "block";
}

function handlenextquestion() {
    currentquestionindex++;
    if(currentquestionindex < question.length)
    {
        showquesion();
    }else{
        showscore();
    }
}

nextbutton.addEventListener("click",()=>{
    if(currentquestionindex < question.length)
    {
        handlenextquestion();
    }else{
        startquiz();
    }
})

startquiz();