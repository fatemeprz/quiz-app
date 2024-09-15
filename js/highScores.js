const firstName=document.querySelector("#first-name")
const firstScore=document.querySelector("#first-score")
const secondName=document.querySelector("#second-name")
const secondScore=document.querySelector("#second-score")
const thirdName=document.querySelector("#third-name")
const thirdScore=document.querySelector("#third-score")
const item=document.querySelector(".item")

const scores=JSON.parse(localStorage.getItem("highScores"))
if(scores.length>=3){

    item.style.visibility="visible"

    const highScores= scores.splice(0,3);
    
    const firstHighScore=highScores[0]
    const secondHighScore=highScores[1]
    const thirdHighScore=highScores[2]
    
    firstName.innerText=firstHighScore.name
    firstScore.innerText=firstHighScore.score
    
    secondName.innerText=secondHighScore.name
    secondScore.innerText=secondHighScore.score
    
    thirdName.innerText=thirdHighScore.name
    thirdScore.innerText=thirdHighScore.score
}else{
    item.style.visibility="hidden"
    
}