const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
	console.log("User connected");
	socket.on("chat message", (msg) => {
		console.log("message: " + msg);
		io.emit("chat message", msg);
	});
	socket.on("someone typing", (msg) => {
		io.emit("someone typing", msg);
	});
	socket.on("stopped typing", () => {
		io.emit("stopped typing");
	});
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
});

server.listen(3000, () => {
	console.log("Hello from 3000!");
});
