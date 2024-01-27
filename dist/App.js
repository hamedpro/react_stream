import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
    var { server_post_verb, server_put_verb, set_virtual_localstorage, parsed_virtual_localstorage, } = useContext(ServerSyncContext);
    function reset_hamed_age() {
        server_put_verb(["hamed", "age"], 0);
    }
    function increment_hamed_age() {
        server_post_verb((data) => {
            data["hamed"]["age"] += 1;
        });
    }
    function loginAsHamedpro() {
        set_virtual_localstorage(JSON.stringify({ active_username: "hamedpro" }));
    }
    function loginAsNeginpro() {
        set_virtual_localstorage(JSON.stringify({ active_username: "neginpro" }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(ServerSyncPreview, {}), _jsx("button", { onClick: increment_hamed_age, children: "increment hamed age" }), _jsx("button", { onClick: reset_hamed_age, children: "reset hamed age" }), _jsx("h1", { children: "virtual local storage test" }), _jsx("p", { children: "current value: " }), _jsx("p", { children: JSON.stringify(parsed_virtual_localstorage) }), _jsx("button", { onClick: loginAsHamedpro, children: "login as hamedpro" }), _jsx("button", { onClick: loginAsNeginpro, children: "login as neginpro" })] }));
}
