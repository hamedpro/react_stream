import { createContext } from "react";
export const ServerSyncContext = createContext({
    data: {},
    server_post_verb: () => {
        throw new Error("this function not implemented in context default value");
    },
    server_put_verb: () => {
        throw new Error("this function not implemented in context default value");
    },
});
