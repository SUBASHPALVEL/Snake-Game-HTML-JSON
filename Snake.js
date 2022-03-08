(function(){

// 1 Setting canvas

var SIZE=500;                                     // Size of the field
var GRID_SIZE=SIZE/50;                            // Size of the grid
var field=document.getElementById('field');       // Getting the element field
field.height=field.width=SIZE* 2;                 // Sets height and width of the field 
field.style.width=field.style.height=SIZE+'px';   // Sets the style for height and weight
var ctx = field.getContext('2d')
ctx.scale(2,2);                                   // Scale the canvas

// 2 Setting inital conditions

var direction = newDirection = 1;                 // -2: up, 2: down, -1: left, 1: right
var snakeLength = 3;                              // Sets length of the snake
var snake = [{x: SIZE / 2, y: SIZE / 2}];         // Snake starts in the center
var food = null;                                  // Sets food value
var end = false;                                  // Sets game end value
var score = 0;                                    // Sets score value

// 3 Defining functions

                                                  // for positioning food at random place
function randomFood() {
    return Math.floor(Math.random() * SIZE / GRID_SIZE) * GRID_SIZE;
  }
         
                                                  // to return coordinates
  function coordToString(obj) {
    return [obj.x, obj.y].join(',');
  }

                                                  // for snake and food
  function tick() {
    var snakePart = {x: snake[0].x, y: snake[0].y};

                                                  // change directon if the new direction is a new axis
    if (Math.abs(direction) !== Math.abs(newDirection)) {
      direction = newDirection;
    }
    var axis = Math.abs(direction) === 1 ? 'x' : 'y'; 
                                                  // 1, -1 are X; 2, -2 are Y
    if (direction < 0) {
      snakePart[axis] -= GRID_SIZE;               // Move left or down
    } else {
      snakePart[axis] += GRID_SIZE;               // Move right or up
    }              

                                                  // Detect if the head is in the same cell as the food
    if (food && food.x === snakePart.x && food.y === snakePart.y) {
      food = null;
      snakeLength +=1;                            // increases snake length3
      score++;                                    // score increment
    }

    ctx.fillStyle = '#22424a';
    ctx.fillRect(0, 0, SIZE, SIZE);               // Reset the field
    if (end) {
      ctx.fillStyle = '#e8dbb0';
      ctx.font = '30px Monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over - Score: '+score, SIZE / 2, SIZE / 2); 
                                                 // to display gameover and score
      ctx.fillText('SPACE to continue', SIZE / 2, 300);
      ctx.fillStyle = '#e8dbb0';                 
      ctx.font = '25px Monospace';
      ctx.fillText('Game by SUBASH', 235, 350);  
      if(newDirection == 5){
      location.reload(); 
      }
    } else {
      snake.unshift(snakePart);                  // Add a new head to front
      snake = snake.slice(0, snakeLength);
      ctx.fillStyle = '#e8dbb0';                 // score
      ctx.font = '20px Monospace';
      ctx.fillText('Score:'+score, 5, 20);       // to display score
      
    }

                                                 // Detect wall collisions
    if (snakePart.x < 0 || snakePart.x >= SIZE || snakePart.y < 0 || snakePart.y >= SIZE) {
      end = true;
    }

    ctx.fillStyle = '#15b31b';
    var snakeObj = {};
    for (var i = 0; i < snake.length; i++) {
      var a = snake[i];
      ctx.fillRect(a.x, a.y, GRID_SIZE-1, GRID_SIZE-1); 
                                                // Paint the snake
                                                // Build a collision lookup object
      if (i > 0) snakeObj[coordToString(a)] = true;
    }

    if (snakeObj[coordToString(snakePart)]) end = true; 
                                               // Collided with the snake tail
                                               // Place a food if needed
    while (!food || snakeObj[coordToString(food)]) {
      food = {x: randomFood(), y: randomFood()};
    }

    ctx.fillStyle = '#f2d729';
    ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE);
                                               // Paint the food
    ctx.drawEllipse(3, 10, 10, 100, 60);
  }

  // 4 Start the game loop

  window.onload = function() {
    setInterval(tick, 100); 
    window.onkeydown = function(e) {
      newDirection = {37: -1, 38: -2, 39: 1, 40: 2, 32: 5}[e.keyCode] || newDirection; 
                                              // for space restart
    };
  };
})();