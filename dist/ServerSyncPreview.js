import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { ServerSyncContext } from "./ServerSyncContext";
export const ServerSyncPreview = () => {
    var { data } = useContext(ServerSyncContext);
    return (_jsxs("div", { children: [_jsx("h1", { children: "ServerSyncPreview" }), _jsx("p", { children: JSON.stringify(data, undefined, 4) })] }));
};
