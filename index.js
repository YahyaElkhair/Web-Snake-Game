var pageBody = document.body;
let animationId = null;
let currentDirection = "right";

const windowBorder = (window.innerWidth / 2) ;
const windowHeight = (window.innerHeight / 2);

const snakeHead = document.getElementById("SnakeHead");
const snakeContainer = document.getElementById("SnakeContainer");
let snakeFood = document.getElementById("SnakeFoodid");

const ReplayBtn = document.getElementById("ReplayBtn");


let i = windowBorder;
var j = windowHeight;


function isSnakeHeadOverlappingFood() {
    let sFood = snakeFood.getBoundingClientRect();
    let sHead = snakeHead.getBoundingClientRect();

    return !(
        sHead.right < sFood.left ||
        sHead.left > sFood.right ||
        sHead.bottom < sFood.top ||
        sHead.top > sFood.bottom
    );
}

function isTouchingBodyBorder() {
    const rect = snakeHead.getBoundingClientRect();
    return (
        (rect.top < 0 || rect.top >= pageBody.offsetHeight - 23) || 
        (rect.left < 0 || rect.left >= pageBody.offsetWidth - 23)
    );
}




function generateSnakeFood(){
    snakeFood = document.createElement("div");
    let snakeFoodTop = Math.random() * ((pageBody.offsetHeight - 44) + 0) - 0;
    let snakeFoodLeft = Math.random() * ((pageBody.offsetWidth - 44) + 0) - 0;

    snakeFood.className = "SnakeFood";
    snakeFood.style.top = `${snakeFoodTop}px`;
    snakeFood.style.left = `${snakeFoodLeft}px`;
    snakeFood.id = "SnakeFoodid";
    pageBody.appendChild(snakeFood);


}

function GameOverStyle(){
    if(document.getElementById("GameOverContainer") == null){
        let GameOverContainer = document.createElement("div");
        GameOverContainer.id = "GameOverContainer";
    

        let GameOverHidding = document.createElement("h1");
        GameOverHidding.textContent = "Game Over";

        let ReplayBtn = document.createElement("button");
        ReplayBtn.id = "ReplayBtn";
        ReplayBtn.textContent = "Play again";
        ReplayBtn.addEventListener("click" , () => location.reload());
        GameOverContainer.appendChild(GameOverHidding);
        GameOverContainer.appendChild(ReplayBtn);
        pageBody.appendChild(GameOverContainer);
    }
}



function handleKeysDown(event){
    if (event.key === "ArrowLeft" && currentDirection !== "right") {
        currentDirection = "left";
        snakeContainer.style.flexDirection = "row";
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
            
        });
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.add("SnakeTailRowRigth");
        })
    } else if (event.key === "ArrowRight" && currentDirection !== "left") {
        currentDirection = "right";
        snakeContainer.style.flexDirection = "row-reverse";
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
            
        });     
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.add("SnakeTailRowLeft");
        })
    } else if (event.key === "ArrowUp" && currentDirection !== "down") {
        currentDirection = "up";
        snakeContainer.style.flexDirection = "column";
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
            
        });        
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.add("SnakeTailColumnBottom");
        })
    } else if (event.key === "ArrowDown" && currentDirection !== "up") {
        currentDirection = "down";
        snakeContainer.style.flexDirection = "column-reverse";
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
            
        });
        document.querySelectorAll(".SnakeTail").forEach(function(t){
            t.classList.add("SnakeTailColumnTop");
        });
    }

}

function addSnakeTail(){
    let snakeTail = document.createElement("div");
    snakeTail.classList.add("SnakeTail" , "SnakeTailRowLeft");
    if(getComputedStyle(snakeContainer).flexDirection == "row"){
        snakeTail.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
        snakeTail.classList.add("SnakeTail" , "SnakeTailRowRigth");

    }else if(getComputedStyle(snakeContainer).flexDirection == "row-reverse"){
        snakeTail.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
        snakeTail.classList.add("SnakeTail" , "SnakeTailRowLeft");

    }else if(getComputedStyle(snakeContainer).flexDirection == "column"){
        snakeTail.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
        snakeTail.classList.add("SnakeTail" , "SnakeTailColumnBottom");

    }else if(getComputedStyle(snakeContainer).flexDirection == "column-reverse"){
        snakeTail.classList.remove("SnakeTailRowLeft" , "SnakeTailRowRigth",  "SnakeTailColumnBottom" , "SnakeTailColumnTop");
        snakeTail.classList.add("SnakeTail" , "SnakeTailColumnTop");

    }
    snakeContainer.appendChild(snakeTail);
}



function moveSnake() {


    if (isTouchingBodyBorder()) {
        cancelAnimationFrame(animationId);
        GameOverStyle();

        pageBody.removeEventListener("keydown", handleKeysDown);
        return;
    }
    
    if (isSnakeHeadOverlappingFood()) {
        let x = document.querySelectorAll(".SnakeFood");
        pageBody.removeChild(x.item(0));
        addSnakeTail();
        generateSnakeFood();
    }
    
    if (currentDirection === "left") {
        i -= 2;
        snakeContainer.style.left = `${i}px`;
        
    } else if (currentDirection === "right") {
        i += 2;
        snakeContainer.style.left = `${i}px`;
    } else if (currentDirection === "up") {
        j -= 2;
        snakeContainer.style.top = `${j}px`;
    } else if (currentDirection === "down") {
        j += 2;
        snakeContainer.style.top = `${j}px`;
    } else {
        console.log("Invalid direction");
    }

    animationId = requestAnimationFrame(moveSnake);
}



pageBody.addEventListener("keydown" , handleKeysDown);
window.onload = function(){
    animationId = requestAnimationFrame(moveSnake);
    generateSnakeFood();

} 