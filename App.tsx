import { ServerSyncPreview } from "./ServerSyncPreview";
import { server_post_verb, server_put_verb } from "./types";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
	var {
		server_post_verb,
		server_put_verb,
		set_virtual_localstorage,
		parsed_virtual_localstorage,
	} = useContext(ServerSyncContext);
	function reset_hamed_age() {
		server_put_verb(["hamed", "age"], 0);
	}
	function increment_hamed_age() {
		server_post_verb((data: any) => {
			data["hamed"]["age"] += 1;
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
			<button onClick={increment_hamed_age}>increment hamed age</button>
			<button onClick={reset_hamed_age}>reset hamed age</button>
			<h1>virtual local storage test</h1>
			<p>current value: </p>
			<p>{JSON.stringify(parsed_virtual_localstorage)}</p>
			<button onClick={loginAsHamedpro}>login as hamedpro</button>
			<button onClick={loginAsNeginpro}>login as neginpro</button>
		</>
	);
}
