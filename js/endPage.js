const scoreText=document.querySelector(".score")
const input=document.querySelector(".input")
const saveButton=document.querySelector("#save-btn")

const score=JSON.parse(localStorage.getItem("score"))
const highScores=JSON.parse(localStorage.getItem("highScores")) || []
scoreText.innerText=score

const save=()=>{
    
    const userName=input.value
    if(!userName || !score){
        alert("Invalid username or score")
    }else{

        const finalScore={name:userName,score}
        highScores.push(finalScore)
        highScores.sort((a,b)=>b.score - a.score)
        highScores.splice(10)
        localStorage.setItem("highScores",JSON.stringify(highScores))
        localStorage.removeItem("score")
        window.location.assign("./index.html")
        
    }


    
}




saveButton.addEventListener("click",save)

