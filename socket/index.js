import { Server } from "socket.io";
import { getUsers } from "../client/src/service/api";

new Server({
  cors: {
    origin: "http://localhost:3000",
  }
});

let users = [];

const addUser = (userData, socketId) => {
  !users.some(user => user.sub === userData.sub) && users.push({...userData, socketId});
}

const getUser = (userId) => {
  return users.find(user => user.sub === userId);
}

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("addUsers", userData => {
    addUser(userData, socket.id);

    io.emit("getUsers", users);
  })

  socket.on("sendMessage", data => {
    const user = getUser(data.recieverId);
    io.to(user.socketId).emit("getMessage", data);
})
})