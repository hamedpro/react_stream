import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
	var { server_post_verb, set_virtual_localstorage, parsed_virtual_localstorage } =
		useContext(ServerSyncContext);
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
		</>
	);
}
