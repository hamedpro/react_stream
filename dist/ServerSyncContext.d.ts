import { Dispatch, SetStateAction } from "react";
import { server_post_verb } from "./types";
import { store_standard_type } from "./utils";
import { AxiosInstance } from "axios";
export declare const ServerSyncContext: import("react").Context<{
    data: store_standard_type;
    server_post_verb: server_post_verb;
    custom_axios: AxiosInstance;
    parsed_virtual_localstorage: {
        [key: string]: any;
    };
    set_virtual_localstorage: Dispatch<SetStateAction<string>>;
}>;
