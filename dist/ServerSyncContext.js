import { createContext } from "react";
import axios from "axios";
export const ServerSyncContext = createContext({
    data: [],
    server_post_verb: () => {
        throw new Error("this function not implemented in context default value");
    },
    parsed_virtual_localstorage: {},
    set_virtual_localstorage: () => {
        throw new Error("this function not implemented in context default value");
    },
    custom_axios: axios.create({}),
});
