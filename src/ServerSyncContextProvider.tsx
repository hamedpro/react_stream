import { ReactNode, useEffect, useRef, useState } from "react";
import { ServerSyncContext } from "./ServerSyncContext";
import { io } from "socket.io-client";
import { applyDiff } from "recursive-diff";
import { deep_copy } from "../utils";

import axios, { AxiosInstance } from "axios";

export function ServerSyncContextProvider<data extends object>({
	children,
	websocket_endpoint,
	restful_endpoint,
}: {
	children: ReactNode;
	websocket_endpoint: string;
	restful_endpoint: string;
}) {
	var [data, set_data] = useState<data | undefined>(undefined);
	var set_data_ref = useRef(set_data);
	set_data_ref.current = set_data;

	// Create an instance of axios with baseUrl set to restful_endpoint
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: restful_endpoint,
	});

	async function update_server(jsonPath: string[], newData: any) {
		return await axiosInstance.put(restful_endpoint, {
			json_path: jsonPath,
			new_data: newData,
		});
	}
	useEffect(() => {
		var websocket = io(websocket_endpoint);
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
