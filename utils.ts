import axios, { AxiosInstance } from "axios";
import { SHA256 } from "crypto-js";
export function deep_copy<T>(input: T): T {
	return JSON.parse(JSON.stringify(input));
}
export function custom_sha256_hash(input: any): string {
	var inputString: string;
	try {
		inputString = JSON.stringify(input);
	} catch (error) {
		throw new Error("Unable to stringify input");
	}
	const hash = SHA256(inputString).toString();
	return hash;
}
export type store_standard_type_item = [id: number, type: string, value: any];
export type store_standard_type = store_standard_type_item[];
export async function new_item(
	server_endpoint: string,
	type: store_standard_type_item[1],
	value: store_standard_type_item[2]
): Promise<number> {
	var response = await axios({
		baseURL: server_endpoint,
		url: "/items",
		method: "post",
		data: { type, value },
	});
	return response.data.new_item_id;
}
export function generateRandomString(length: number = 7): string {
	const characters = "0123456789";

	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return result;
}
