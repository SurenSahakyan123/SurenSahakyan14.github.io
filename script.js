const board = document.getElementById("game-board");
const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const cooll = document.getElementById("cool")
let deadMusic = new Audio("./Apo.mp3")
let audio = new Audio("./ost.mp3")
let gridSize = 40;
let snake = [{ x: 20, y: 20 }];
let food = generateFood();
let direction = "right";
let isGameStarted = false;
let gameSpeedDeley = 200;
let highScore = 0;
let gameIntervalId;
let eatMusic = new Audio("./eat.mp3")
function draw() {
    audio.play();
    board.innerHTML = ""
    drawSnake();
    drawFood();
    snakeScore();
}





function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

// draw();

function drawFood() {
    let foodElement = creatElement("div", "food");
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}



function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameIntervalId);
        eatMusic.play();
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeedDeley);

    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";

    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeedDeley);
}

function hendleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame();
    }


    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }

    }


}

function resetGame() {
    stopGame();
    updateHighScore();
    snake = [{ x: 20, y: 20 }];
    food = generateFood();
    direction = "right"
    snakeScore();
    
}

function stopGame() {
    cooll.style.display = "block"
    deadMusic.play();
    audio.currentTime = 999999999999999999999999999;
    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block"
}

function snakeScore(){
    let currentScore = snake.length -1;
    score.textContent = currentScore.toString().padStart(3,"0")
    if(currentScore === 10){
        gameSpeedDeley = 150
    }
    else if(currentScore === 20){
        gameSpeedDeley = 100
    }
    else if(currentScore === 30){
        gameSpeedDeley = 75
    }
    else if(currentScore === 40){
        gameSpeedDeley = 50
    } 
}

function updateHighScore(){
    let curentScore  = snake.length - 1;
    if(curentScore > highScore){
         highScore = curentScore;
    }
    highScoreText.textContent = highScore.toString().padStart(3, "0");
    highScoreText.style.display = "block";
   
}


document.addEventListener("keydown", hendleKeyPress)

