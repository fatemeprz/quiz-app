import formatData from "./helper.js"

const loder=document.querySelector(".loder")
const container=document.querySelector(".container")
const questionText=document.querySelector(".question-text")
const answerList=document.querySelectorAll(".answer")
const questionNumber=document.querySelector("#question-no")
const scoreText=document.querySelector("#score-count")
const finishBtn=document.querySelector("#finish")
const nextButton=document.querySelector("#next")


let isAccepted=true
let CORRECT_BOUNS=10
let score=0

// const answer=document.querySelector(".answers")

const ULR="https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
let formatedData=null
let questionIndex=0
let correctAnswer=null

questionNumber.innerText=questionIndex+1
async function getData() {
    // scoreText.innerText=0;

    try{

        const res=await fetch(ULR)
        const data=await res.json()
        console.log(data)
        formatedData=formatData(data.results)
        console.log(formatedData)
        start()
        
        // fetchData(data.results);
        
    }
    catch(error){
        console.log(error);
        // fail()

    }
    
}

const start=()=>{
    showQuestions()
    // score()
    loder.style.display="none";
    container.style.display="block"
}

const fail=()=>{
    container.style.display="none"
    loder.style.display="block"
    loder.style.marginTop="calc(50vh - 50px)"
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

// async function fetchData(data){

//         data.map(item=>{
//         dataList.push(item)
        
//         // questionText.innerText=dataList[questionIndex].question
//         questionText.innerText=item.question
//         const randomChoice=randomItem()
//         answer.children[randomChoice].innerText=item.correct_answer
//         if(randomChoice===0){
//         answer.children[1].innerText=item.incorrect_answers[0]
//         answer.children[2].innerText=item.incorrect_answers[1]
//         answer.children[3].innerText=item.incorrect_answers[2]
//         }else if(randomChoice===1){
//             answer.children[0].innerText=item.incorrect_answers[0]
//             answer.children[2].innerText=item.incorrect_answers[1]
//             answer.children[3].innerText=item.incorrect_answers[2]
//         }else if(randomChoice===2){
//             answer.children[0].innerText=item.incorrect_answers[0]
//             answer.children[1].innerText=item.incorrect_answers[1]
//             answer.children[3].innerText=item.incorrect_answers[2]
//         }else if(randomChoice===3){
//             answer.children[0].innerText=item.incorrect_answers[0]
//             answer.children[1].innerText=item.incorrect_answers[1]
//             answer.children[2].innerText=item.incorrect_answers[2]
//         }

//     })
//     questionIndex++

// }

// const randomItem=()=>{
//     const random=Math.floor(Math.random()*4)
//     return random
// }
// console.log(dataList);

const answerHandeler=(event,index)=>{

    // dataList.map(item=>{
    //    if(event.target===correctAnswer){
    //         event.target.style.backgroundColor="green"
    //         return
    //    }else if(event.target!==correctAnswer){
    //     event.target.style.backgroundColor="red"
    //     answerList.forEach(text=>{
    //       if(text``===correctAnswer)  {
    //         text.style.backgroundColor="green"
    //       }
    //     })
    //     return


    //    }
    // })
    // if(event.target.textContent===formatedData[questionIndex].answers[correctAnswer]){
    //         event.target.style.backgroundColor="green"
    //         return
    // }else{
    //     event.target.style.backgroundColor="red"
    //     answerList.forEach((answer,index)=>{
    //         if(index===correctAnswer){
    //             answer.style.backgroundColor="green"
    //         }
    //     })

    // }
    const isCorrect=index===correctAnswer ? true : false
    calcutescore(isCorrect)

    if(isCorrect){
        event.target.classList.add("correct")
    }else{
        event.target.classList.add("incorrect")
        answerList[correctAnswer].classList.add("correct")
        
        
    }
    // console.dir(event.target.textContent)
    
    // console.log(formatedData[questionIndex].answers[correctAnswer]);
    
}

const calcutescore=(userChoice)=>{

    

    if (!isAccepted) return;
    isAccepted=false
    
    if(userChoice){
         
        // scoreNumber= +scoreNumber+CORRECT_BOUNS 
        score+=CORRECT_BOUNS
        // localStorage.setItem("score",scoreNumber)
        // scoreText.innerText=localStorage.getItem("score")
        scoreText.innerText=score
        return

    }
    // else {
    //     // localStorage.setItem("score",scoreCount)
    //     // scoreText.innerText=localStorage.getItem("score")
    //     return
    // }
        

    
}
const removeClasses=()=>{
    answerList.forEach(answer=>{
        answer.classList="answer"
    })
}
const finishHandeler=()=>{
    window.location.assign("../html/endPage.html")
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

// answerList.forEach(item=>item.addEventListener("click",answerHandeler))
