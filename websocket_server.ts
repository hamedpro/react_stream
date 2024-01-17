import { Server, Socket } from "socket.io";
import fs from "fs";
import path from "path";
import os from "os";
import rdiff from "recursive-diff";
import { createServer as http_create_server } from "http";
var store_path = path.join(os.homedir(), "store.json");
var ws_clients: { socket: Socket; cached_content: undefined | object }[] = [];
import chokidar from "chokidar";
var websocket_web_server = http_create_server();
var io = new Server(websocket_web_server, {
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
websocket_web_server.listen(8250);
