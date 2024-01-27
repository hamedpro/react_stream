import { useContext } from "react";
import { ServerSyncContext } from "./ServerSyncContext";

export const ServerSyncPreview = () => {
	var { data } = useContext(ServerSyncContext);

	return (
		<div>
			<h1>ServerSyncPreview</h1>
			<p>{JSON.stringify(data, undefined, 4)}</p>
		</div>
	);
};
