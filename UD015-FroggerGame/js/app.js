// Enemies our player must avoid
var Enemy = function (x, y, speed, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    checkCollisions(this);

    if (this.x >= 505) {
        this.x = 0;
        this.y = getRandomInt(50, 300);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

Player.prototype.update = function () {
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// control movement of player
Player.prototype.handleInput = function (keyPress) {
    switch (keyPress) {
        case 'left':
            if (this.x - (this.speed + 18) >= -2) {
                this.x -= this.speed + 18;
            }
            break;
        case 'up':
            this.y -= this.speed;
            break;
        case 'right':
            if (this.x + (this.speed + 18) <= 402) {
                this.x += this.speed + 18;
            }
            break;
        case 'down':
            if (this.y + this.speed <= 405) {
                this.y += this.speed;
            }
    }
    checkSuccess(this);
};

// check collisions of player and enemies
var checkCollisions = function (enemy) {
    if (enemy.x < player.x + 71 &&
        enemy.x + 71 > player.x &&
        enemy.y + 20 < player.y + 101 &&
        enemy.y + 101 > player.y + 20) {
        player.x = 200;
        player.y = 405;
        window.setTimeout(function () {
            window.alert('You failed!');
        }, 100);
    }
};

// check if the player reach the opposite
var checkSuccess = function (player) {
    if (player.y == -10) {
        window.setTimeout(function () {
            window.alert('You win!');
            player.x = 200;
            player.y = 405;
        }, 100);
    }
};

var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for (var i = 0; i < 5; i++) {
    allEnemies.push(new Enemy(0, getRandomInt(50, 300), getRandomInt(50, 200), 'images/enemy-bug.png'));
}

// Place the player object in a variable called player
var player = new Player(200, 405, 83, 'images/char-boy.png');
// var player = new Player(200, 405, 83, 'images/char-pig.png');

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
