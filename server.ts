import express, { Request, Response, response } from "express";
import cors from "cors";
import path from "path";
import os from "os";
import fs from "fs";
import { createServer as http_create_server } from "http";
import { Server, Socket } from "socket.io";
import rdiff from "recursive-diff";
import chokidar from "chokidar";
import { custom_sha256_hash, store_standard_type } from "./utils";
import formidable from "formidable";
var app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());

var store_path = path.join(os.homedir(), "store.json");
if (fs.existsSync(store_path) === false) {
	fs.writeFileSync(store_path, JSON.stringify({}));
}

function read_data(): store_standard_type {
	return JSON.parse(fs.readFileSync(store_path, "utf-8"));
}

function write_data(data: store_standard_type): void {
	fs.writeFileSync(store_path, JSON.stringify(data, undefined, 4));
}

app.post("/change", (req: Request, res: Response) => {
	const {
		diff,
		hash,
	}: { diff: rdiff.rdiffResult[]; hash: ReturnType<typeof custom_sha256_hash> } = req.body;

	const data = read_data();
	if (hash !== custom_sha256_hash(data)) {
		/* this hash check is to make sure that the
		client is not sending a diff that is based on outdated data */
		res.status(400).json("Hash mismatch");
		return;
	}

	write_data(rdiff.applyDiff(data, diff));

	res.end();
});
app.post("/files", async (req: Request, res: Response) => {
	const uploadsDir = path.resolve(os.homedir(), "uploads");
	var new_file_id: number;
	if (fs.readdirSync(uploadsDir).length === 0) {
		new_file_id = 1;
	} else {
		new_file_id =
			Math.max(
				...fs.readdirSync(uploadsDir).map((filenname) => Number(filenname.split(".")[0]))
			) + 1;
	}

	var f = formidable({
		uploadDir: path.resolve(os.homedir(), "uploads"),
	});
	f.parse(req, (err, fields, files) => {
		if (err) {
			res.status(400).json({ error: err });
			return;
		}
		var file = files["file"]?.[0];
		if (file === undefined) {
			res.status(400).json({ error: "No file" });
			return;
		}
		var old_file_path = file.filepath;
		if (!file.originalFilename) {
			res.status(400).json({ error: "No filename" });
			return;
		}
		var new_file_path = path.join(
			uploadsDir,
			`${new_file_id}.${file.originalFilename.split(".").pop()}`
		);
		fs.renameSync(old_file_path, new_file_path);
		res.json({ new_file_id });
	});
});
app.get("/files/:file_id", (req: Request, res: Response) => {
	var file_id = req.params.file_id;
	var filename = fs
		.readdirSync(path.join(os.homedir(), "uploads"))
		.find((filename) => filename.startsWith(file_id));
	if (filename === undefined) {
		res.status(404).json({ error: "File not found" });
		return;
	}
	res.sendFile(path.resolve(os.homedir(), "uploads", filename));
});
var server = http_create_server(app);

var ws_clients: { socket: Socket; cached_content: undefined | store_standard_type }[] = [];
var io = new Server(server, {
	path: "/ws",
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
	maxHttpBufferSize: 16e6,
});

function sync_clients() {
	var data = read_data();
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
