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
export type store_standard_type = [id: number, type: string, value: any][];
