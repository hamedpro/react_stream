var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ServerSyncPreview } from "./ServerSyncPreview";
import { ServerSyncContext } from "./ServerSyncContext";
import { useContext, useState } from "react";
export function App() {
    var { server_post_verb, set_virtual_localstorage, parsed_virtual_localstorage, custom_axios } = useContext(ServerSyncContext);
    var [session_upload_files, set_session_upload_files] = useState([]);
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
    function handle_upload() {
        return __awaiter(this, void 0, void 0, function* () {
            var files = document.getElementById("file_input").files;
            if (files === null) {
                alert("files attr of input was null");
                return;
            }
            var form = new FormData();
            form.append("file", files[0]);
            var { new_file_id } = (yield custom_axios({
                data: form,
                method: "post",
                url: "/files",
            })).data;
            set_session_upload_files((prev) => [...prev, new_file_id]);
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx(ServerSyncPreview, {}), _jsx("button", { onClick: create_hamed, children: "create hamed" }), _jsx("button", { onClick: increment_hamed_age, children: "increment hamed age" }), _jsx("h1", { children: "virtual local storage test" }), _jsx("p", { children: "current value: " }), _jsx("p", { children: JSON.stringify(parsed_virtual_localstorage) }), _jsx("button", { onClick: loginAsHamedpro, children: "login as hamedpro" }), _jsx("button", { onClick: loginAsNeginpro, children: "login as neginpro" }), _jsx("h1", { children: "session upload files test" }), _jsx("input", { type: "file", id: "file_input" }), _jsx("button", { onClick: handle_upload, children: "Upload" }), _jsx("p", { children: "urls of current session uploaded files:" }), session_upload_files.map((file_id) => (_jsxs("button", { onClick: () => window.open(new URL(`/files/${file_id}`, "http://localhost:8000").href, "_blank"), children: ["file ", file_id] }, file_id)))] }));
}
