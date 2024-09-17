const levels=document.querySelectorAll(".links-level")

let deficultyLevel=null;

const levelHandeler=(event,index)=>{
   
    switch (index) {
        case 0:
            deficultyLevel="easy"
            break;
        case 1:
            deficultyLevel="medium"
            break;
        case 2:
            deficultyLevel="hard"
            break
        }

        window.location.assign("./game.html")

        
        localStorage.setItem("level",JSON.stringify (deficultyLevel))
}




levels.forEach((button,index)=>button.addEventListener("click",event=>levelHandeler(event,index)))