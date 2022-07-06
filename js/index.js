//Constants & Variables
let inputDir = {x: 0, y: 0};
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gamerover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('theme.mp3');
let score = 0;
let speed = 5;
let lastPaintTime = 0;
let snakeArray = [ {x: 13, y: 15} ]
food = {x: 6, y: 7};

//Game Functions
// Follow the link to know why to use requestanimationframe over setinterval or settimeout
//https://stackoverflow.com/questions/38709923/why-is-requestanimationframe-better-than-setinterval-or-settimeout

function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
 }
 function isCollide(sarr){
    return false;
}

 function gameEngine(){
    //Part 1: Updating the Snake array & Food
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0};
        alert("Game Over!! Press any key to play Restart");
        snakeArray = [ {x: 13, y: 15} ];
        musicSound.play();
        score = 0;
    } 
    // If food is eaten increase the score and regenrate food
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x){
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x, y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food= {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b - a)* Math.random())}
    }

    //Moving the snake
    for (let i = snakeArray.length - 2; i>=0; i--){  
        snakeArray[i+1] = {...snakeArray[i]}; //Complete new object {...snakeArray[i]}
    }

    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;

    //Part 2: Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
       
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });
    //Part 3: Display the food
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
 }


// Main logic begins 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1} //Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});

