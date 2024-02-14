import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import rdiff, { applyDiff } from "recursive-diff";
import {
	custom_sha256_hash,
	deep_copy,
	store_standard_type,
	store_standard_type_item,
} from "./utils";

import axios, { AxiosInstance } from "axios";

export function useSubscribe({
	subscribe_to,
	server_endpoint,
}: {
	subscribe_to: number | "*";
	server_endpoint: string;
}) {
	var [data, set_data] = useState<store_standard_type_item | store_standard_type | undefined>(
		undefined
	);
	var set_data_ref = useRef(set_data);
	set_data_ref.current = set_data;

	// Create an instance of axios with baseUrl set to restful_endpoint
	const axiosInstance: AxiosInstance = axios.create({
		baseURL: server_endpoint,
	});

	async function update(modifier: (data: store_standard_type_item) => store_standard_type_item) {
		if (subscribe_to === "*") {
			throw "for an instance which is subscribed to '*', update function is not implemented yet.";
		}
		if (data === undefined) {
			throw new Error(
				"i dont have data of this item cached yet so i can not do any modification on it."
			);
		}

		var clone = deep_copy(data);

		// type of data can not be undefined or store_standard_type here
		var modified = modifier(clone as store_standard_type_item);
		var custom_axios = axios.create({ baseURL: server_endpoint });
		return await custom_axios({
			data: {
				diff: rdiff.getDiff(data, modified),
				hash: custom_sha256_hash(data),
			},
			method: "put",
			url: `/items/${subscribe_to}`,
		});
	}
	var socket_ref = useRef<undefined | ReturnType<typeof io>>(undefined);
	useEffect(() => {
		if (socket_ref.current !== undefined) {
			socket_ref.current.disconnect();
		}

		var websocket = io(server_endpoint, { path: "/ws" });
		websocket.on("data", (diff) => {
			set_data_ref.current((prev) => {
				var clone = prev !== undefined ? deep_copy(prev) : undefined;
				var result = applyDiff(clone, diff);
				return result;
			});
		});
		websocket.emit("subscribe_to_item", subscribe_to);
		return () => {
			if (socket_ref.current !== undefined) {
				socket_ref.current.disconnect();
			}
		};
	}, [subscribe_to]);

	return { update, data };
}
