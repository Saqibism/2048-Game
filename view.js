// import keypress from 'keypress';
import Game from "./engine/game.js";

$(document).ready(function() {
  let game = new Game(4);
  newGame(game);
});

export const newGame = function(game) {
  document.getElementById("score").innerHTML = "Your score: " + game.score;
  update(game);

  $("#reset").on("click", function() {
    document.getElementById("result").innerHTML = " ";
    game.setupNewGame();
    update(game);
  });

  $(document).keydown(function(e) {
    var s = String.fromCharCode(e.which);
    keys(s, game);
    update(game);
  });

  $(document).onkeydown = function(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.view.event.preventDefault();
    }
  };
  $(root).onkeydown = function(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.view.event.preventDefault();
    }
  };
};

export const update = function(game) {
  let arr = game.getGameState()["board"];
  document.getElementById("1,1").innerHTML = arr[0];
  document.getElementById("1,2").innerHTML = arr[1];
  document.getElementById("1,3").innerHTML = arr[2];
  document.getElementById("1,4").innerHTML = arr[3];
  document.getElementById("2,1").innerHTML = arr[4];
  document.getElementById("2,2").innerHTML = arr[5];
  document.getElementById("2,3").innerHTML = arr[6];
  document.getElementById("2,4").innerHTML = arr[7];
  document.getElementById("3,1").innerHTML = arr[8];
  document.getElementById("3,2").innerHTML = arr[9];
  document.getElementById("3,3").innerHTML = arr[10];
  document.getElementById("3,4").innerHTML = arr[11];
  document.getElementById("4,1").innerHTML = arr[12];
  document.getElementById("4,2").innerHTML = arr[13];
  document.getElementById("4,3").innerHTML = arr[14];
  document.getElementById("4,4").innerHTML = arr[15];
  document.getElementById("score").innerHTML =
    "Your score: " + game.getGameState()["score"];

  if (game.getGameState()["won"] == true) {
    document.getElementById("result").innerHTML =
      "You Won! Score: " +
      game.getGameState()["score"] +
      " Press Reset Game or continue playing";
  }
  if (game.getGameState()["over"] == true) {
    document.getElementById("result").innerHTML =
      "You Lost! Score: " +
      game.getGameState()["score"] +
      " Press Reset To Start Over";
  }
};

export const keys = function(k, board) {
  switch (k) {
    case "&":
      board.move("up");
      break;
    case "(":
      board.move("down");
      break;
    case "%":
      board.move("left");
      break;
    case "'":
      board.move("right");
      break;
  }
};
