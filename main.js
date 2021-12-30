// CANVAS CREATION
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
document.body.style.textAlign = "center";

// IMG ELEMENTS
var bgImage = new Image();
bgImage.src = "img/background.png";

var player1Image = new Image();
player1Image.src = "img/playerNEW.png";

var player2Image = new Image();
player2Image.src = "img/playerNEW.png";

var gameballImage = new Image();
gameballImage.src = "img/ball.png";

var heroposition;

// GAME OBJECTS
var game = {};

class Entity {
    constructor(width, height, speed, value) {
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.value = value;
    }
    get xEnd() { return this.x + this.width; }
    get yEnd() { return this.y + this.height; }
    get init() {
        this.points = 0;
    }
}
var player1 = new Entity(14, 62, 6, 0);
var player2 = new Entity(14, 62, 6, 0);
var keysDown = {};
var gameball = new Entity(15, 16, 3, 0);
var gameballstatus;
var playerstatus;
var gamestatus;
var keepmovement;

// Stores the keys pressed by the player.
addEventListener("keydown", function(key) {
    keysDown[key.keyCode] = true;
});

// Delete the released keys.
addEventListener("keyup", function(key) {
    delete keysDown[key.keyCode];
});

var counterId;

/**
 * Initiates game parameters.
 */
var init = function() {
    game.finished = false;
    playerstatus = true;
    gamestatus = "playing";
    player1.x = canvas.width / 2 - 150;
    player1.y = canvas.height / 2 - 14;
    player1.init;
    player2.x = canvas.width / 2 + 130;
    player2.y = canvas.height / 2 - 14;
    gameball.x = canvas.width / 2 - 7;
    gameball.y = canvas.width / 2 - 15;
    gameballstatus = "movingright";
    player2.init;
    canvas.removeEventListener("click", init);
}

var continuegame = function() {
    game.finished = false;
    player1.x = canvas.width / 2 - 150;
    player1.y = canvas.height / 2 - 14;
    player2.x = canvas.width / 2 + 130;
    player2.y = canvas.height / 2 - 14;
    gameball.x = canvas.width / 2 - 7;
    gameball.y = canvas.width / 2 - 15;
    gameballstatus = "movingright";
}

/**
 * Updates hero's position based on a modifier.
 * @param {*} modifier 
 */

 var movePls = function() {
    gameball.x -= 2;
 }

var update = function(modifier) {
    //ball
    if(gamestatus == "playing"){
    if (gameball.y <= 0 && gameballstatus == "movingupright" ){
        gameballstatus = "movingdownright";
    }

    if (gameball.y <= 0 && gameballstatus == "movingupleft"){
        gameballstatus = "movingdownleft";
    }

    if ((gameball.y + gameball.height) >= canvas.height && gameballstatus == "movingdownright"){
        gameballstatus = "movingupright";
    }

    if ((gameball.y + gameball.height) >= canvas.height && gameballstatus == "movingdownleft"){
        gameballstatus = "movingupleft";
    }

        if (gameballstatus == "movingupleft"){
            gameball.x -= gameball.speed;
            gameball.y -= gameball.speed;
        }
        if (gameballstatus == "movingupright"){
            gameball.x += gameball.speed;
            gameball.y -= gameball.speed;
        }
        if (gameballstatus == "movingright"){
            gameball.x += gameball.speed;
        }
        if (gameballstatus == "movingleft"){
            gameball.x -= gameball.speed;
        }
        if (gameballstatus == "movingdownright"){
            gameball.x += gameball.speed;
            gameball.y += gameball.speed;
        }
        if (gameballstatus == "movingdownleft"){
            gameball.x -= gameball.speed;
            gameball.y += gameball.speed;
        }
    
        

    // Player 2
    if (38 in keysDown) { // up
        if (player2.y > 10 && playerstatus == true) {
            player2.y -= player2.speed;
            
            
        }
    }
    if (40 in keysDown) { // down
        if (player2.yEnd < canvas.height - 10 && playerstatus == true) {
            player2.y += player2.speed;
            
            
        }
    }

    // Player 1
    if (87 in keysDown) { // up
        if (player1.y > 10 && playerstatus == true) {
            player1.y -= player1.speed;
            
            
        }
    }
    if (83 in keysDown) { // down
        if (player1.yEnd < canvas.height - 10 && playerstatus == true) {
            player1.y += player1.speed;
            
            
        }
    }

   
    if(80 in keysDown) {
        gamestatus = "paused";
    }
    
    
    
    

  
    if(gameball.x > canvas.width  || gameball.x < 15){
        game.finished = true;
    }
    
    
     
    // Player 2
   for(i = player2.y; i <= (player2.y + ((player2.height / 2) / 2)); i++){
    if(gameball.x <= (player2.x + player2.width)
    && player2.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && player2.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingupleft";
    }
   }

   for(i = (player2.y + ((player2.height / 2) / 2)); i <= ((player2.y + player2.height) - ((player2.height / 2) / 2)); i++){
    if(gameball.x <= (player2.x + player2.width)
    && player2.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && gameball.y > (player2.y + ((player2.height / 2) / 2))
    && player2.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingleft";
    }
   }

   for(i = (player2.y + (player2.height / 2)); i <= (player2.y + player2.height); i++){
    if(gameball.x <= (player2.x + player2.width)
    && player2.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && gameball.y > ((player2.y + player2.height) - ((player2.height / 2) / 2))
    && player2.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingdownleft";
    }
   }

   // Player 1
   for(i = player1.y; i <= (player1.y + ((player1.height / 2) / 2)); i++){
    if(gameball.x <= (player1.x + player1.width)
    && player1.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && player1.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingupright";
    }
   }

   for(i = (player1.y + ((player1.height / 2) / 2)); i <= ((player1.y + player1.height) - ((player1.height / 2) / 2)); i++){
    if(gameball.x <= (player1.x + player1.width)
    && player1.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && gameball.y > (player1.y + ((player1.height / 2) / 2))
    && player1.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingright";
    }
   }

   for(i = (player1.y + (player1.height / 2)); i <= (player1.y + player1.height); i++){
    if(gameball.x <= (player1.x + player1.width)
    && player1.x <= (gameball.x + gameball.width)
    && gameball.y <= i
    && gameball.y > ((player1.y + player1.height) - ((player1.height / 2) / 2))
    && player1.y <= (gameball.y + gameball.height)
    ){
        gameballstatus = "movingdownright";
    }
   }
}
else if (gamestatus == "paused"){
    if(85 in keysDown){
        gamestatus = "playing";
    }
}
}


/**
 * check if a collision has occurs.
 */

/**
 * Renders the game elements on canvas.
 */
var render = function() {
    ctx.drawImage(bgImage, 0, 0);
    ctx.drawImage(player1Image, player1.x, player1.y);
    ctx.drawImage(player2Image, player2.x, player2.y);
    ctx.drawImage(gameballImage, gameball.x, gameball.y);
    ctx.font = "20px Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    ctx.fillText("Points: "+ player1.points, 20, 20);
    ctx.fillText("Points: "+ player2.points, 390, 20);

    

    if ((gameball.x + gameball.width) >= canvas.width) {
        player1.points++;
        continuegame();
    }
     
    if (gameball.x <= 15) {
        player2.points++;
        continuegame();
    }

        if (player1.points >= 5) {
            ctx.fillText("Player 1 win!", 190, 220);
            ctx.fillText("Click to start again!", 160, 260);
            canvas.addEventListener("click", init);
            gameballstatus = "";
            playerstatus = false;
        } else if (player2.points >= 5) {
            ctx.fillText("Player 2 win!", 190, 220);
            ctx.fillText("Click to start again!", 160, 260);
            canvas.addEventListener("click", init);
            gameballstatus = "";
            playerstatus = false;
        }
    
        
}

/**
 * Main loop of game.
 */
var main = function() {
    if (game.finished == false) {
        update(0.02);
    }
    render();
    window.requestAnimationFrame(main);
}

init();
main();