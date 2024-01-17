export function deep_copy<T>(input: T): T {
	return JSON.parse(JSON.stringify(input));
}
