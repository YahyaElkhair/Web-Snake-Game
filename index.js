var snakePsition = [0 , 0];
const windowBorder = window.innerWidth - 26;
const nbrMovingPixels = ((Math.floor(windowBorder / 2)) / 25) + 0.001;
var pageBody = document.body;


function isGameOver(SnakePositions , windowBorder){
    return SnakePositions[1] >= Math.floor(windowBorder / 2);
}
function GameIsOver(){
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
function moveSnake(){
    console.log(Math.floor(windowBorder / 2));
    console.log(nbrMovingPixels);

    let snakeHead = document.getElementById("SnakeHead");
    pageBody.addEventListener("keydown" , function(event){
        switch(event.key) {
            case "ArrowUp":
                snakeHead.style.transform += "translateY(-15px)";
                snakePsition[0]++;
                break;
            case "ArrowDown":
                snakeHead.style.transform += "translateY(15px)";
                snakePsition[0]--;
                break;
            case "ArrowLeft":
                if(!isGameOver(snakePsition , windowBorder)){
                    snakeHead.style.transform += `translateX(-${nbrMovingPixels}px)`;
                    snakePsition[1] += nbrMovingPixels
                }else{
                    GameIsOver();
                }
                break;

            case "ArrowRight":
                if(!isGameOver(snakePsition , windowBorder)){
                    snakeHead.style.transform += `translateX(${nbrMovingPixels}px)`;
                    snakePsition[1] += nbrMovingPixels
                }else{
                    GameIsOver();
                }
                break;
            default:
                break;
        }
    });
}
moveSnake();