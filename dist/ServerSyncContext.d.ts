/// <reference types="react" />
import { server_post_verb, server_put_verb } from "./types";
import { store_standard_type } from "./utils";
export declare const ServerSyncContext: import("react").Context<{
    data: store_standard_type;
    server_post_verb: server_post_verb;
    server_put_verb: server_put_verb;
}>;
