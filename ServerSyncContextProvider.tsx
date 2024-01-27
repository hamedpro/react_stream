import { ReactNode, useEffect, useRef, useState } from "react";
import { ServerSyncContext } from "./ServerSyncContext";
import { io } from "socket.io-client";
import rdiff, { applyDiff } from "recursive-diff";
import { custom_sha256_hash, deep_copy, store_standard_type } from "./utils";

import axios, { AxiosInstance } from "axios";

export function ServerSyncContextProvider({
	children,
	server_endpoint,
}: {
	children: ReactNode;
	server_endpoint: string;
}) {
	var [data, set_data] = useState<store_standard_type | undefined>(undefined);
	var set_data_ref = useRef(set_data);
	set_data_ref.current = set_data;

	// Create an instance of axios with baseUrl set to restful_endpoint
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: server_endpoint,
	});

	async function server_put_verb(jsonPath: rdiff.rdiffResult["path"], newData: any) {
		return await axiosInstance({
			data: {
				json_path: jsonPath,
				new_data: newData,
			},
			method: "put",
			url: "/change",
		});
	}
	async function server_post_verb(modifier: (data: store_standard_type) => void) {
		var clone = deep_copy(data);
		if (clone === undefined) {
			throw new Error("data is not defined yet to be modified.");
		}
		modifier(clone);
		return await axiosInstance({
			data: {
				diff: rdiff.getDiff(data, clone),
				hash: custom_sha256_hash(data),
			},
			method: "post",
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
			value={{ data, server_post_verb, server_put_verb }}
			children={children}
		/>
	);
}
