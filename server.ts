import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import os from "os";
import fs from "fs";
import { createServer as http_create_server } from "http";
import { Server, Socket } from "socket.io";
import rdiff from "recursive-diff";
import chokidar from "chokidar";

var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

var store_path = path.join(os.homedir(), "store.json");
if (fs.existsSync(store_path) === false) {
	fs.writeFileSync(store_path, JSON.stringify({}));
}

function read_data(): object {
	return JSON.parse(fs.readFileSync(store_path, "utf-8"));
}

function write_data(data: object): void {
	fs.writeFileSync(store_path, JSON.stringify(data, undefined, 4));
}

app.put("/change", (req: Request, res: Response) => {
	const { json_path, new_data } = req.body;

	const data = read_data();

	let currentData: { [key: string]: any } = data;
	for (let i = 0; i < json_path.length - 1; i++) {
		const key = json_path[i];
		if (currentData[key] === undefined) {
			currentData[key] = {};
		}
		currentData = currentData[key];
	}
	const lastKey = json_path[json_path.length - 1];
	currentData[lastKey] = new_data;

	write_data(currentData);

	res.end();
});

var server = http_create_server(app);

var ws_clients: { socket: Socket; cached_content: undefined | object }[] = [];
var io = new Server(server, {
	path: "/ws",
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
	maxHttpBufferSize: 16e6,
});

function sync_clients() {
	var data: object = JSON.parse(fs.readFileSync(store_path, "utf8"));
	for (var i = 0; i < ws_clients.length; i++) {
		if (data !== ws_clients[i].cached_content) {
			ws_clients[i].socket.emit("data", rdiff.getDiff(ws_clients[i].cached_content, data));
			ws_clients[i].cached_content = data;
		}
	}
}
chokidar.watch(store_path).on("all", (event, path) => {
	sync_clients();
});
io.on("connection", (socket) => {
	ws_clients.push({ socket, cached_content: undefined });
	sync_clients();
});

server.listen(8000);
