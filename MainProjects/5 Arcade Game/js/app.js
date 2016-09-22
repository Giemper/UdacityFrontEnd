var currentSprite = "images/char-boy.png";
var score = 0;
var high_score = score;
var path = 1.0;

// Enemies our player must avoid
var Enemy = function(position) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() * (1010 - 0) + 0;
    this.y = position;
    this.speed = Math.random() * (150 - 60) + 60;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * path;

    if(this.x >= 1010) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = currentSprite;
    this.x = 505; //Increments of 101 -- X Grid Starts at 0
    this.y = 626; //Increments of 83 -- Y Grid Starts at -38
}

Player.prototype.render = function() {
    this.sprite = currentSprite;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.update = function() {
    //This returns the player to the start path every time it reaches the water.
    //It also increases the speed of the bugs.
    if(this.y <= -38) {
        this.x = 505;
        this.y = 626;
        path += 0.5;
        $("#speed").text("Speed: " + path + "x");
        gem.setGem();
    }
}

Player.prototype.handleInput = function(key) {
    //Reads the keys pressed to move the player, 
    //and limits his movement within the playable canvas.
    //The farthest you move, the higher the score will be.
    if(key === 'left' && this.x !== 0)
        ctx.drawImage(Resources.get(this.sprite), this.x -= 101, this.y);
    else if(key === 'up') {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y -= 83);
        score ++;
    }
    else if(key === 'right' && this.x !== 909)
        ctx.drawImage(Resources.get(this.sprite), this.x += 101, this.y);
    else if(key === 'down' && this.y !== 709) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y += 83);
        score--;
    }
    
    setScore();

    //Tracks the score and the high score counters
    gem.crash();
}

var Gem = function() {
    this.xs = [0, 101, 202, 303, 404, 505, 606, 707, 808, 909];
    this.ys = [45, 128, 211, 294, 377, 460, 543];

    this.setGem();
}

Gem.prototype.render = function() {
    if(this.draw === true)
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Gem.prototype.setGem = function() {
    var currentGem = Math.random() * 10;
    if(currentGem <= 6){
        this.sprite = 'images/Gem Blue.png';
        this.value = 2;
    }
    else if(currentGem <= 9) {
        this.sprite = 'images/Gem Green.png';
        this.value = 5;
    }
    else {
        this.sprite = 'images/Gem Orange.png';
        this.value = 10;
    }

    this.x = this.xs[Math.floor(Math.random() * ((this.xs.length) - 1))];
    this.y = this.ys[Math.floor(Math.random() * ((this.ys.length) - 1))];

    this.draw = true;
}

Gem.prototype.crash = function() {
    if(player.x === this.x && player.y === this.y) {
        this.draw = false;
        this.render();

        score += this.value;
        setScore();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player();

var gem = new Gem();

//Creates all 7 enemies (one for each lane)
//Every enemy passes its Y position (lane)
var allEnemies = [
    this.enemyOne = new Enemy(60),
    this.enemyTwo = new Enemy(143),
    this.enemyThree = new Enemy(226),
    this.enemyFour = new Enemy(309),
    this.enemyFive = new Enemy(392),
    this.enemySix = new Enemy(475),
    this.enemySeven = new Enemy(558)
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Changes the playable character
$(".character").click(function() {
    $(".character").removeClass("star");
    $(this).toggleClass("star"); 
    currentSprite = this.value;
});

var setScore = function() {
    $("#current-score").text("Score: " + score);
    if(score > high_score){
        high_score = score;
        $("#high-score").text("High Score: " + score);
    }
}