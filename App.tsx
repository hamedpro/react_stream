import { ServerSyncPreview } from "./ServerSyncPreview";
import { server_post_verb, server_put_verb } from "./types";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
	var { server_post_verb, server_put_verb } = useContext(ServerSyncContext);
	function reset_hamed_age() {
		server_put_verb(["hamed", "age"], 0);
	}
	function increment_hamed_age() {
		server_post_verb((data: any) => {
			data["hamed"]["age"] += 1;
		});
	}

	return (
		<>
			<ServerSyncPreview />
			<button onClick={increment_hamed_age}>increment hamed age</button>
			<button onClick={reset_hamed_age}>reset hamed age</button>
		</>
	);
}
