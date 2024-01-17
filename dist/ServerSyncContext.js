import { createContext } from "react";
export const ServerSyncContext = createContext({
    data: {},
    update_server: () => {
        throw new Error("update_server not implemented in context default value");
    },
});
