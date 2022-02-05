let socket = io();
//alert("HI");

const form = document.querySelector("#form");
const input = document.querySelector("#input");
let messages = document.querySelector("#messages");
const curr = document.querySelector("#current");

form.addEventListener("submit", (par) => {
	par.preventDefault();
	if (input.value) {
		socket.emit("chat message", input.value);
		input.value = "";
	}
});

form.addEventListener("keydown", () => {
	socket.emit("someone typing", "Usr is typing");
});

let timer;
const waitTime = 1000;

form.addEventListener("keyup", () => {
	clearTimeout(timer);
	timer = setTimeout(() => {
		socket.emit("stopped typing");
	}, waitTime);
});

socket.on("chat message", (msg) => {
	let item = document.createElement("li");
	let ts = document.createElement("div");
	ts.setAttribute("id", "timeNow");
	item.textContent = msg;
	const today = new Date();
	hr = today.getHours();
	half = hr > 12 ? "pm" : "am";
	hr = hr % 12;
	hr = hr > 0 ? hr : 12;
	todayFull =
		hr +
		":" +
		String(today.getMinutes()).padStart(2, "0") +
		half +
		" " +
		String(today.getDate()).padStart(2, "0") +
		"/" +
		String(today.getMonth() + 1).padStart(2, "0") +
		"/" +
		today.getFullYear();
	ts.innerText = todayFull;
	messages.appendChild(item);
	item.appendChild(ts);
	window.scrollTo(0, document.body.scrollHeight);
});

socket.on("someone typing", (msg) => {
	curr.innerText = msg;
});

socket.on("stopped typing", () => {
	curr.innerText = "";
	curr.innerHTML = "<br>";
});
