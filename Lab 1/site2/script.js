document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const gridSize = 20;
  let snake = [{ x: 160, y: 160 }];
  let direction = { x: 0, y: 0 };
  let changingDirection = false;
  let food = { x: 0, y: 0 };
  let gameOver = false;

  document.addEventListener("keydown", changeDirection);

  function main() {
    if (gameOver) {
      alert("Игра окончена!");
      return;
    }

    setTimeout(function onTick() {
      changingDirection = false;
      clearCanvas();
      drawFood();
      advanceSnake();
      drawSnake();
      main();
    }, 100);
  }

  function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
  }

  function drawSnake() {
    snake.forEach(drawSnakePart);
  }

  function drawSnakePart(snakePart) {
    ctx.fillStyle = "green";
    ctx.strokeStyle = "darkgreen";

    ctx.fillRect(snakePart.x, snakePart.y, gridSize, gridSize);
    ctx.strokeRect(snakePart.x, snakePart.y, gridSize, gridSize);
  }

  function advanceSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    snake.unshift(head);

    const hasEatenFood = snake[0].x === food.x && snake[0].y === food.y;
    if (hasEatenFood) {
      spawnFood();
    } else {
      snake.pop();
    }

    checkCollision();
  }

  function changeDirection(event) {
    if (changingDirection) return;
    changingDirection = true;
    const keyPressed = event.key;

    const goingUp = direction.y === -gridSize;
    const goingDown = direction.y === gridSize;
    const goingRight = direction.x === gridSize;
    const goingLeft = direction.x === -gridSize;

    if (keyPressed === "ArrowUp" && !goingDown) {
      direction = { x: 0, y: -gridSize };
    }
    if (keyPressed === "ArrowDown" && !goingUp) {
      direction = { x: 0, y: gridSize };
    }
    if (keyPressed === "ArrowLeft" && !goingRight) {
      direction = { x: -gridSize, y: 0 };
    }
    if (keyPressed === "ArrowRight" && !goingLeft) {
      direction = { x: gridSize, y: 0 };
    }
  }

  function checkCollision() {

    for (let i = 4; i < snake.length; i++) {
      const hasCollided = snake[i].x === snake[0].x && snake[i].y === snake[0].y;
      if (hasCollided) {
        gameOver = true;
      }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x >= canvas.width;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y >= canvas.height;

    if (hitLeftWall || hitRightWall || hitToptWall || hitBottomWall) {
      gameOver = true;
    }
  }

  function spawnFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

    snake.forEach(function isFoodOnSnake(part) {
      const foodIsOnSnake = part.x === food.x && part.y === food.y;
      if (foodIsOnSnake) spawnFood();
    });
  }

  function drawFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";

    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.strokeRect(food.x, food.y, gridSize, gridSize);
  }

  spawnFood();
  main();
});
