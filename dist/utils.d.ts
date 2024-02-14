export declare function deep_copy<T>(input: T): T;
export declare function custom_sha256_hash(input: any): string;
export type store_standard_type_item = [id: number, type: string, value: any];
export type store_standard_type = store_standard_type_item[];
export declare function new_item(server_endpoint: string, type: store_standard_type_item[1], value: store_standard_type_item[2]): Promise<number>;
export declare function generateRandomString(length?: number): string;
