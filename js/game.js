import formatData from "./helper.js"


const loder=document.querySelector(".loder")
const container=document.querySelector(".container")
const questionText=document.querySelector(".question-text")
const answerList=document.querySelectorAll(".answer")
const questionNumber=document.querySelector("#question-no")
const scoreText=document.querySelector("#score-count")
const finishBtn=document.querySelector("#finish")
const nextButton=document.querySelector("#next")
const level=JSON.parse(localStorage.getItem("level"))
const error=document.querySelector(".error")

let isAccepted=true
let CORRECT_BOUNS=10
let score=0;
let ULR="https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"

level ?  ULR=`https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple` : ULR

localStorage.removeItem("level")

let formatedData=null
let questionIndex=0
let correctAnswer=null

questionNumber.innerText=questionIndex+1
async function getData() {

    try{

        const res=await fetch(ULR)
        const data=await res.json()
        formatedData=formatData(data.results)
        start()

    }
    catch(error){
        console.log(error);
        fail()
    }
    
}

const start=()=>{
    showQuestions()
    localStorage.removeItem("level")
    loder.style.display="none";
    container.style.display="block"
}
const fail=()=>{
    container.style.display="none";
    error.style.display="block"
    loder.style.display="none"
    


}
const showQuestions=()=>{
    scoreText.innerText=score
    questionNumber.innerText=questionIndex+1
    const {question,answers,correctAnswerIndex}=
        formatedData[questionIndex]
    correctAnswer=correctAnswerIndex;
    questionText.innerText=question;
    answerList.forEach((answer,index)=>{
        answer.innerText=answers[index]
    })    
}


const answerHandeler=(event,index)=>{

    const isCorrect=index===correctAnswer ? true : false
    calcuteScore(isCorrect)

    if(isCorrect){
        event.target.classList.add("correct")
    }else{
        event.target.classList.add("incorrect")
        answerList[correctAnswer].classList.add("correct")
        
        
    }
}

const calcuteScore=(userChoice)=>{

    if (!isAccepted) return;
    isAccepted=false
    
    if(userChoice){
         
        score+=CORRECT_BOUNS
        scoreText.innerText=score
        return

    }  
}

const removeClasses=()=>{
    answerList.forEach(answer=>{
        answer.classList="answer"
    })
}

const finishHandeler=()=>{
    window.location.assign("./endPage.html")
    localStorage.setItem("score",JSON.stringify(score))
}

const nextHandeler=()=>{

    questionIndex++
    if(questionIndex<formatedData.length){

        showQuestions()
        removeClasses()
        isAccepted=true
    }else{
        finishHandeler()
    }
}



window.addEventListener("load",getData)
nextButton.addEventListener("click",nextHandeler)
answerList.forEach((butten,index)=>butten.addEventListener("click",(event)=>answerHandeler(event,index)))
finishBtn.addEventListener("click",finishHandeler)
