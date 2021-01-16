const Express = require("express")();
const Http = require("http").Server(Express);
const SocketIO = require("socket.io")(Http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

var position = {
  x: 200,
  y: 200,
};

const positionMax = {
  x: 660,
  y: 500,
};

SocketIO.on("connection", (socket) => {
  socket.emit("position", position);

  socket.on("reset", () => {
    console.log("Reset");
    position.x = positionMax.x / 2 - 10;
    position.y = positionMax.y / 2 - 10;
    SocketIO.emit("position", position);
  });

  socket.on("move", (data) => {
    console.log("Move");
    switch (data) {
      case "left":
        position.x -= 20;
        if (position.x < 0) {
          position.x = 0;
        }
        SocketIO.emit("position", position);
        break;
      case "right":
        position.x += 20;
        if (position.x > positionMax.x - 20) {
          position.x = positionMax.x - 20;
        }
        SocketIO.emit("position", position);
        break;
      case "up":
        position.y -= 20;
        if (position.y < 0) {
          position.y = 0;
        }
        SocketIO.emit("position", position);
        break;
      case "down":
        position.y += 20;
        if (position.y > positionMax.y - 20) {
          position.y = positionMax.y - 20;
        }
        SocketIO.emit("position", position);
        break;
    }
  });
});

Http.listen(3001, () => {
  console.log("Listening at :3001...");
});
