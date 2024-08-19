var pageBody = document.body;
let animationId = null;
let currentDirection = "left";

const windowBorder = (window.innerWidth / 2) ;
const windowHeight = (window.innerHeight / 2);

const snakeHead = document.getElementById("SnakeHead");
let snakeFoodd = null;





const GameOverHedding = document.getElementById("GameOverHedding");

function isSnakeHeadOverlappingFood() {
    const sHead = snakeHead.getBoundingClientRect();
    const sFood = snakeFoodd.getBoundingClientRect();
    return (snakeHeadTop === snakeFoodLeft || snakeHeadLeft === snakeFoodTop);
}

function isTouchingBodyBorder() {
    const rect = snakeHead.getBoundingClientRect();
    return (
        (rect.top < 0 || rect.top >= pageBody.offsetHeight - 23) || 
        (rect.left < 0 || rect.left >= pageBody.offsetWidth - 23)
    );
}
let snakeFoodTop = null;
let snakeFoodLeft = null;


let snakeHeadTop = null;
let snakeHeadLeft = null;



function generateSnakeFood(){
    let snakeFood = document.createElement("div");
    snakeFoodTop = Math.random() * ((pageBody.offsetHeight - 44) + 0) - 0;
    snakeFoodLeft = Math.random() * ((pageBody.offsetWidth - 44) + 0) - 0;

    snakeFood.className = "SnakeFood";
    snakeFood.style.top = `${snakeFoodTop}px`;
    snakeFood.style.left = `${snakeFoodLeft}px`;
    snakeFood.id = "SnakeFoodid";
    pageBody.appendChild(snakeFood);
    snakeFoodd = snakeFood;


    console.log("Food left : " , snakeFoodTop);
    console.log("Food top : " , snakeFoodLeft);
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
    if(isSnakeHeadOverlappingFood()){
        let x =  document.querySelectorAll(".SnakeFood");
        pageBody.removeChild(x.item(0));
        addSnakeTail();
        generateSnakeFood();
    }
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

let i = windowBorder;
var j = windowHeight;

function moveSnake() {


    if (isTouchingBodyBorder()) {
        cancelAnimationFrame(animationId);
        GameOverStyle();
        pageBody.removeEventListener("keydown", handleKeysDown);
        return;
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
    snakeHeadTop = j;
    snakeHeadLeft = i;
    animationId = requestAnimationFrame(moveSnake);
}


pageBody.addEventListener("keydown" , handleKeysDown);
window.onload = function(){
    animationId = requestAnimationFrame(moveSnake);

    generateSnakeFood();
} 