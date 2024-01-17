import React, { useContext } from "react";
import { ServerSyncContext } from "./ServerSyncContext";

export const ServerSyncPreview = () => {
	var { exams_data } = useContext(ServerSyncContext);

	return (
		<div>
			<h1>ServerSyncPreview</h1>
			<p>{JSON.stringify(exams_data, undefined, 4)}</p>
		</div>
	);
};
