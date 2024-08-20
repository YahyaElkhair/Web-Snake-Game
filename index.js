var pageBody = document.body;
let animationId = null;
let currentDirection = "left";

const windowBorder = (window.innerWidth / 2) ;
const windowHeight = (window.innerHeight / 2);

const snakeHead = document.getElementById("SnakeHead");
let snakeFood = document.getElementById("SnakeFoodid");



let i = windowBorder;
var j = windowHeight;

const GameOverHedding = document.getElementById("GameOverHedding");

function isSnakeHeadOverlappingFood() {
    let sFood = snakeFood.getBoundingClientRect();
    let sHead = snakeHead.getBoundingClientRect();

    // Check for overlap on all sides


    return !(
        sHead.right < sFood.left ||
        sHead.left > sFood.right ||
        sHead.bottom < sFood.top ||
        sHead.top > sFood.bottom
    );;
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
    if(document.getElementById("GameOverHedding") == null){
        let gameOverContainer = document.createElement("div");
        gameOverContainer.id = "gameOverContainer";
        gameOverContainer.style.display = 'flex';
        gameOverContainer.style.flexDirection = 'row';
        gameOverContainer.style.justifyContent = 'center';
        gameOverContainer.style.alignItems = 'center';

        let gameOverText = document.createElement("h1");
        gameOverText.textContent = "You Lost !!";
        gameOverText.style.zIndex = 9999;
        gameOverText.id = "GameOverHedding";
        gameOverContainer.appendChild(gameOverText);
        pageBody.appendChild(gameOverContainer);
    }
}


function handleKeysDown(event){
    if (event.key === "ArrowLeft" && currentDirection !== "right") {
        currentDirection = "left";
    } else if (event.key === "ArrowRight" && currentDirection !== "left") {
        currentDirection = "right";
    } else if (event.key === "ArrowUp" && currentDirection !== "down") {
        currentDirection = "up";
    } else if (event.key === "ArrowDown" && currentDirection !== "up") {
        currentDirection = "down";
    }

}




function addSnakeTail(){
    let snakeTail = document.createElement("div");
    snakeTail.className = "SnakeTail";
    snakeHead.appendChild(snakeTail);
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
        snakeHead.style.left = `${i}px`;
        
    } else if (currentDirection === "right") {
        i += 2;
        snakeHead.style.left = `${i}px`;
    } else if (currentDirection === "up") {
        j -= 2;
        snakeHead.style.top = `${j}px`;
    } else if (currentDirection === "down") {
        j += 2;
        snakeHead.style.top = `${j}px`;
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