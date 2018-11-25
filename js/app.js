/*
  -----------------------------
    G A M E   S E T T I N G S
  -----------------------------
*/


var gameLives = 3; // STARTING NUMBER OF LIVES PER GAME
document.getElementById('playerLives').innerHTML = gameLives;

// SET UP OF PLAYER SCORE
var score = 0;
document.getElementById('playerScore').innerHTML = score;


/*
// TIMER SETUP
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}
*/

/*
  ---------------------------
    E N E M Y   S E T   U P
  ---------------------------
*/


// ENEMIES FOR PLAYER TO AVOID

var Enemy = function (x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Once enemies are off the canvas, they reappear randomly with different speeds
    if (this.x > 510) {
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }

    // Checks for collisions between the player and the enemies
    if (player.x < this.x + 80 && player.x + 80 > this.x && player.y < this.y + 60 && 60 + player.y > this.y) {
        player.x = 202;
        player.y = 405;
        score = score - 5;
        if (score < 0) {
            score = 0;
        }
        gameLives--;
        document.getElementById('playerScore').innerHTML = score;
        document.getElementById('playerLives').innerHTML = gameLives;
    }

    if (gameLives === 0) {
        openModal();

        allEnemies = [];

        // CLICK EVENT LISTENERS - CLOSE
        closeBtn.addEventListener('click', closeModal);
        window.addEventListener('click', clickOutside);
    }
};

var modal = document.getElementById('startModal'); // GET MODAL ELEMENT
var closeBtn = document.getElementsByClassName('closeBtn')[0]; // GET CLOSE BUTTON

// OPEN MODAL FUNCTION
function openModal() {
    modal.style.display = 'block';
}

// CLOSE MODAL FUNCTION
function closeModal() {
    modal.style.display = 'none';
}

// CLOSE MODAL FUNCTION IF CLICKED OUTSIDE MODAL
function clickOutside(e) {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/*
  ------------------------------
    P L A Y E R   S E T   U P
  ------------------------------
*/


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function () {
    this.spriteIndex = 0;
    this.setSprite();  // ASSIGN THE PLAYER BASES ON INDEX

    // TILE COORDINATES
    this.x = 200;
    this.y = 320;
};


// CHARACTER IMAGES
Player.prototype.SPRITES = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

/* PLAYER METHODS */

// ASSIGN THE PLAYER BASES ON INDEX
Player.prototype.setSprite = function () {
    this.sprite = this.SPRITES[this.spriteIndex];
};

// INCREMENT INDEX WITHIN SPRITE ARRAY 
Player.prototype.nextSprite = function () {
    this.spriteIndex < this.SPRITES.length - 1 ? this.spriteIndex++ : this.spriteIndex = 0;
};

// UPDATE PLAYER POSITION
Player.prototype.update = function () {
    // X AXIS BOUNDARIES
    if (player.x < 0) {
        this.x = 0;
    }

    else if (player.x > 400) {
        this.x = 400;
    }
    // Y AXIS BOUNDARIES
    else if (player.y > 400) {
        this.y = 400;
    }
    // SCORING FOR PLAYER REACHING WATER
    else if (player.y < 20) {
        score = score + 10;
        document.getElementById('playerScore').innerHTML = score;
        this.reset();
    }
    if (score <= 0) {

    }

    if (score >= 100) {
        openWinnerModal();

        allEnemies = [];

        // CLICK EVENT LISTENERS - CLOSE
        closeWinnerBtn.addEventListener('click', closeWinnerModal);
        window.addEventListener('click', clickWinnerOutside);
    }
};

var winnerModal = document.getElementById('startWinner'); // GET MODAL ELEMENT
var closeWinnerBtn = document.getElementsByClassName('closeBtn')[1]; // GET CLOSE BUTTON

// OPEN MODAL FUNCTION
function openWinnerModal() {
    winnerModal.style.display = 'block';
}

// CLOSE MODAL FUNCTION
function closeWinnerModal() {
    winnerModal.style.display = 'none';
}

// CLOSE MODAL FUNCTION IF CLICKED OUTSIDE MODAL
function clickWinnerOutside(e) {
    if (e.target == winnerModal) {
        winnerModal.style.display = 'none';
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    if (gameLives === 0 || score >= 100) {
        return;
    }

    switch (keyPress) {
        case 'left':
            this.x -= 101;
            break;
        case 'up':
            this.y -= 83;
            break;
        case 'right':
            this.x += 101;
            break;
        case 'down':
            this.y += 83;
            break;
        case 'space': // ALLOWS CHARACTER CHANGE
            this.nextSprite();
            this.setSprite();
            break;
        case 'enter': // ALLOWS CHARACTER CHANGE
            this.nextSprite();
            this.setSprite();
            break;
        default:
            break;
    }
};

// SET CHARACTER AT STARTING POINT
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 320;
};


var player = new Player();

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(-80, 60 + 80 * 0, (Math.floor(Math.random() * 4 + 1) * 30));
var enemy2 = new Enemy(-80, 60 + 80 * 1, (Math.floor(Math.random() * 4 + 1) * 15));
var enemy3 = new Enemy(-80, 60 + 80 * 2, (Math.floor(Math.random() * 4 + 1) * 45));
var enemy4 = new Enemy(-80, 60 + 80 * 0, (Math.floor(Math.random() * 4 + 1) * 55));
var enemy5 = new Enemy(-80, 60 + 80 * 1, (Math.floor(Math.random() * 4 + 1) * 60));
var enemy6 = new Enemy(-80, 60 + 80 * 2, (Math.floor(Math.random() * 4 + 1) * 25));

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// PLAY AGAIN BUTTON | RESTART GAME
function playAgain() {
    window.location.reload(true);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        // TO CHANGE CHARACTERS
        13: 'enter',
        32: 'space',

        // FOR USE OF ARROW KEYS TO MOVE CHARACTER DIRECTIONALLY
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

        // FOR USE OF 'W, A, S, D' KEYS TO MOVE CHARACTER DIRECTIONALLY
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down',

        // PAUSE GAME
        80: 'KeyP'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});