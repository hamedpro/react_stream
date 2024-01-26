import { ReactNode, useEffect, useRef, useState } from "react";
import { ServerSyncContext } from "./ServerSyncContext";
import { io } from "socket.io-client";
import { applyDiff } from "recursive-diff";
import { deep_copy } from "./utils";

import axios, { AxiosInstance } from "axios";

export function ServerSyncContextProvider<data extends object>({
	children,
	server_endpoint,
}: {
	children: ReactNode;
	server_endpoint: string;
}) {
	var [data, set_data] = useState<data | undefined>(undefined);
	var set_data_ref = useRef(set_data);
	set_data_ref.current = set_data;

	// Create an instance of axios with baseUrl set to restful_endpoint
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: server_endpoint,
	});

	async function update_server(jsonPath: string[], newData: any) {
		return await axiosInstance({
			data: {
				json_path: jsonPath,
				new_data: newData,
			},
			method: "put",
			url: "/change",
		});
	}
	useEffect(() => {
		var websocket = io(server_endpoint, { path: "/ws" });
		websocket.on("data", (diff) => {
			set_data_ref.current((prev) => {
				var clone = prev !== undefined ? deep_copy(prev) : undefined;
				var result = applyDiff(clone, diff);
				return result;
			});
		});
	}, []);

	if (data === undefined) {
		return "first sync with server is not finished yet.";
	}

	return (
		<ServerSyncContext.Provider
			value={{ data, update_server }} // Pass axiosInstance in the value of the context
			children={children}
		/>
	);
}
