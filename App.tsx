import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext, useState } from "react";
export function App() {
	var { server_post_verb, set_virtual_localstorage, parsed_virtual_localstorage, custom_axios } =
		useContext(ServerSyncContext);
	var [session_upload_files, set_session_upload_files] = useState<number[]>([]);
	function create_hamed() {
		server_post_verb((data: any, max_existing_id: number) => {
			data.push([max_existing_id + 1, "user", { username: "hamedpro", age: 0 }]);
		});
	}
	function increment_hamed_age() {
		server_post_verb((data) => {
			var pointer = data.find(([id, type, value]) => value.username === "hamedpro");
			if (pointer === undefined) {
				alert("hamedpro not found in data.");
				return;
			}
			pointer[2].age++;
		});
	}
	function loginAsHamedpro() {
		set_virtual_localstorage(JSON.stringify({ active_username: "hamedpro" }));
	}
	function loginAsNeginpro() {
		set_virtual_localstorage(JSON.stringify({ active_username: "neginpro" }));
	}
	async function handle_upload() {
		var files = (document.getElementById("file_input") as HTMLInputElement).files;
		if (files === null) {
			alert("files attr of input was null");
			return;
		}
		var form = new FormData();
		form.append("file", files[0]);

		var { new_file_id } = (
			await custom_axios({
				data: form,
				method: "post",
				url: "/files",
			})
		).data;
		set_session_upload_files((prev) => [...prev, new_file_id]);
	}
	return (
		<>
			<ServerSyncPreview />
			<button onClick={create_hamed}>create hamed</button>
			<button onClick={increment_hamed_age}>increment hamed age</button>

			<h1>virtual local storage test</h1>
			<p>current value: </p>
			<p>{JSON.stringify(parsed_virtual_localstorage)}</p>
			<button onClick={loginAsHamedpro}>login as hamedpro</button>
			<button onClick={loginAsNeginpro}>login as neginpro</button>
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
