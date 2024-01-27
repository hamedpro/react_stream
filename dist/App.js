import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
    var { server_post_verb, server_put_verb } = useContext(ServerSyncContext);
    function reset_hamed_age() {
        server_put_verb(["hamed", "age"], 0);
    }
    function increment_hamed_age() {
        server_post_verb((data) => {
            data["hamed"]["age"] += 1;
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx(ServerSyncPreview, {}), _jsx("button", { onClick: increment_hamed_age, children: "increment hamed age" }), _jsx("button", { onClick: reset_hamed_age, children: "reset hamed age" })] }));
}
