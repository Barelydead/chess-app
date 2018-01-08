(function() {
    console.log("Socket client running");

    var squares = document.getElementsByClassName("square");
    var gameBoard = document.getElementById("board");
    var gameId = document.getElementById("gameId").innerHTML;
    var username = document.getElementById("username").innerHTML;
    var infoBox = document.getElementById("info-box");
    var clickCount = 0;
    var color = "";
    var data = {};

    data.room = gameId;


    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            if (clickCount === 0) {
                this.classList.toggle("selected");

                data.x = this.attributes["data-square"].value.slice(0, 1);
                data.y = parseInt(this.attributes["data-square"].value.slice(-1));

                clickCount = 1;
            } else {
                data.nx = this.attributes["data-square"].value.slice(0, 1);
                data.ny = parseInt(this.attributes["data-square"].value.slice(-1));
                data.color = color;
                clearSelected();
                clickCount = 0;

                socket.emit("move", data);
            }
        });
    }

    function clearSelected() {
        for (var i = 0; i < squares.length; i++) {
            squares[i].classList.remove("selected");
        }
    }

    function updateScroll() {
        infoBox.scrollTop = infoBox.scrollHeight;
    }


    /* eslint-disable */
    var socket = io.connect();
    /* eslint-enable */

    socket.on("connect", function() {
        socket.emit("room id", {gameId: gameId, username: username});

        infoBox.innerHTML += "You joined room " + gameId + "<br>";
    });

    socket.on("color", function(data) {
        if (data[0] === username) {
            color = "white";
            gameBoard.classList.add("rotated-board");
            for (let i = 0; i < squares.length; i++) {
                squares[i].classList.add("rotated-board");
            }
        } else {
            color = "black";
        }

        infoBox.innerHTML += "" + data[0] + " is white and " + data[1] + " is black <br>";
    });

    socket.on("move", function(status) {
        var board = status.Board;

        for (var i = 0; i < board.length; i++) {
            var oldData = squares[i].attributes["data-piece"].value;
            var newData = board[i].piece.color + " " + board[i].piece.symbol;

            if (oldData !== newData) {
                squares[i].attributes["data-piece"].value = newData;
                squares[i].setAttribute("id", board[i].piece.img);
            }
        }

        updateScroll();
        infoBox.innerHTML += status["Last move"].toString() + "<br>";
        infoBox.innerHTML += status["Player to act"].toString() + "'s turn to act" + "<br>";
    });

    socket.on("start game", function(status) {
        var board = status.Board;

        for (var i = 0; i < board.length; i++) {
            squares[i].setAttribute("data-piece", board[i].piece.color
                                    + " "
                                    + board[i].piece.symbol);
            squares[i].setAttribute("id", board[i].piece.img);
        }

        infoBox.innerHTML += "Game is starting...<br> White to act <br>";
    });

    socket.on("player disconnect", function() {
        infoBox.innerHTML += "Your opponent disconnected, game is closing in 10 sec..<br>";

        setTimeout( function() {
            window.location.href = "http://localhost:3000/lobby";
        }, 10000);
    });
})();
