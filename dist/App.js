import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext } from "react";
export function App() {
    var { server_post_verb, set_virtual_localstorage, parsed_virtual_localstorage } = useContext(ServerSyncContext);
    function create_hamed() {
        server_post_verb((data, max_existing_id) => {
            data.push([max_existing_id + 1, "user", { username: "hamedpro", age: 0 }]);
        });
    }
    function increment_hamed_age() {
        server_post_verb((data) => {
            var pointer = data.find(([id, type, value]) => value.username === "hamedpro");
            if (pointer === undefined) {
                alert("hamedpro not found in data.");
                return;
            }
            pointer[2].age++;
        });
    }
    function loginAsHamedpro() {
        set_virtual_localstorage(JSON.stringify({ active_username: "hamedpro" }));
    }
    function loginAsNeginpro() {
        set_virtual_localstorage(JSON.stringify({ active_username: "neginpro" }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(ServerSyncPreview, {}), _jsx("button", { onClick: create_hamed, children: "create hamed" }), _jsx("button", { onClick: increment_hamed_age, children: "increment hamed age" }), _jsx("h1", { children: "virtual local storage test" }), _jsx("p", { children: "current value: " }), _jsx("p", { children: JSON.stringify(parsed_virtual_localstorage) }), _jsx("button", { onClick: loginAsHamedpro, children: "login as hamedpro" }), _jsx("button", { onClick: loginAsNeginpro, children: "login as neginpro" })] }));
}
