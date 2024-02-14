import { store_standard_type, store_standard_type_item } from "./utils";
export declare function useSubscribe({ subscribe_to, server_endpoint, }: {
    subscribe_to: number | "*";
    server_endpoint: string;
}): {
    update: (modifier: (data: store_standard_type_item) => store_standard_type_item) => Promise<import("axios").AxiosResponse<any, any>>;
    data: store_standard_type_item | store_standard_type | undefined;
};
