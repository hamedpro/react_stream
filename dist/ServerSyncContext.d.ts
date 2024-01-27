import { Dispatch, SetStateAction } from "react";
import { server_post_verb } from "./types";
import { store_standard_type } from "./utils";
export declare const ServerSyncContext: import("react").Context<{
    data: store_standard_type;
    server_post_verb: server_post_verb;
    parsed_virtual_localstorage: {
        [key: string]: any;
    };
    set_virtual_localstorage: Dispatch<SetStateAction<string>>;
}>;
