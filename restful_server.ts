import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import os from "os";
import fs from "fs";
import { createServer as http_create_server } from "http";

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

var restful_web_server = http_create_server(app);
restful_web_server.listen(8000);
