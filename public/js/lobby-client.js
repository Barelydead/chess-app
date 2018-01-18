(function() {
    /* eslint-disable */
    var socket = io.connect();
    /* eslint-enable */
    var userCount = document.getElementById("nr-users");
    var userList = document.getElementById("user-list");
    var username = document.getElementById("username").innerHTML;
    var input = document.getElementById("chat-input");
    var chat = document.getElementById("chat-window");
    var roomForm = document.getElementById("room-form");
    var roomList = document.getElementById("room-list");

    function renderUsers(data) {
        var usernames = [];

        for (let key in data.users) {
            usernames.push(key);
        }

        userList.innerHTML = "";

        for (var i = 0; i < usernames.length; i++) {
            var listItem = document.createElement("li");
            var text = document.createTextNode(usernames[i]);

            listItem.appendChild(text);
            userList.appendChild(listItem);
        }
        userCount.innerHTML = Object.keys(data.users).length;
    }

    function updateScroll() {
        chat.scrollTop = chat.scrollHeight;
    }

    function renderGameList(data) {
        roomList.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
            let listItem = document.createElement("div");
            let button = document.createElement("a");

            listItem.innerHTML = "<h2>" + data[i].name + "</h2>"
                               + "<p>Created by: " + data[i].owner + "</p>"
                               + "<p>Connected: " + data[i].connected + "</p>"
                               + "<p>skill: " + data[i].skill + "</p>";

            button.setAttribute("href", "/chess/" + data[i].id);
            button.setAttribute("data-id", data[i].id);
            button.innerHTML = "Join game";
            button.addEventListener("click", function() {
                socket.emit("joined room", this.getAttribute("data-id"));
            });

            listItem.append(button);
            listItem.classList.add("room-item")
            roomList.append(listItem);
        }
    }

    roomForm.addEventListener("submit", function(event) {
        var room;

        event.preventDefault();
        room = {};

        room.name = this[0].value;
        room.skill = this[1].value;
        room.owner = username;
        room.connected = 0;
        room.id = Math.floor(Math.random() * 100000);

        socket.emit("new room", room);
    });


    function sendMessage() {
        let data = {};

        data.message = input.value;
        data.from = username;
        data.to = "all";

        socket.emit('chat message', data);
        input.value = "";
        input.focus();
    }


    socket.emit("username", username);

    socket.on("prefill chat", function(data) {
        for (var i = 0; i < data.length; i++) {
            var date = new Date(data[i].time);
            var options = {  year: 'numeric', month: 'numeric', day: 'numeric' };
            var msgHolder = chat.appendChild(document.createElement("div"));

            msgHolder.innerHTML = data[i].from
                                  + " - "
                                  + date.toLocaleString('sv-SV', options)
                                  + ": " + data[i].message;
        }

        updateScroll();
    });


    socket.on("user list", function(serverInfo) {
        renderUsers(serverInfo);
        renderGameList(serverInfo.games);
    });

    socket.on('chat message', function(data) {
        var msgHolder = chat.appendChild(document.createElement("div"));

        msgHolder.innerHTML = data.from + " - " + data.time.toLocaleString() + ": " + data.message;
        updateScroll();
    });

    socket.on("disconnect", username);

    window.onkeydown = function(e) {
        const key = e.keyCode;

        switch (key) {
            case 13:
                if (input === document.activeElement) {
                    sendMessage();
                }
                break;

            default:
                break;
        }
    };
})();
