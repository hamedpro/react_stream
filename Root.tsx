import { useContext, useState } from "react";
import { useSubscribe } from "./useSubscribe";
import { generateRandomString, new_item } from "./utils";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
export function Root() {
	var nav = useNavigate();
	var [session_upload_files, set_session_upload_files] = useState<number[]>([]);
	async function create_random_new_user() {
		var new_item_id = await new_item("http://localhost:8000", "user", {
			username: generateRandomString(),
			password: generateRandomString(),
		});
		nav(`/items/${new_item_id}`);
	}

	async function handle_upload() {
		var files = (document.getElementById("file_input") as HTMLInputElement).files;
		if (files === null) {
			alert("files attr of input was null");
			return;
		}
		var form = new FormData();
		form.append("file", files[0]);

		var custom_axios = axios.create({
			baseURL: "http://localhost:8000",
			method: "post",
			url: "/files",
		});
		var { new_file_id } = (await custom_axios({ data: form })).data;
		set_session_upload_files((prev) => [...prev, new_file_id]);
	}
	return (
		<>
			<button onClick={create_random_new_user}>create random new user</button>

			<h1>session upload files test</h1>
			<input
				type="file"
				id="file_input"
			/>
			<button onClick={handle_upload}>Upload</button>
			<p>urls of current session uploaded files:</p>
			{session_upload_files.map((file_id) => (
				<button
					key={file_id}
					onClick={() =>
						window.open(
							new URL(`/files/${file_id}`, "http://localhost:8000").href,
							"_blank"
						)
					}
				>
					file {file_id}
				</button>
			))}
		</>
	);
}
