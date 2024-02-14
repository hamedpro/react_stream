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
import { useState } from "react";
import { generateRandomString, new_item } from "./utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export function Root() {
    var nav = useNavigate();
    var [session_upload_files, set_session_upload_files] = useState([]);
    function create_random_new_user() {
        return __awaiter(this, void 0, void 0, function* () {
            var new_item_id = yield new_item("http://localhost:8000", "user", {
                username: generateRandomString(),
                password: generateRandomString(),
            });
            nav(`/items/${new_item_id}`);
        });
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
            var custom_axios = axios.create({
                baseURL: "http://localhost:8000",
                method: "post",
                url: "/files",
            });
            var { new_file_id } = (yield custom_axios({ data: form })).data;
            set_session_upload_files((prev) => [...prev, new_file_id]);
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx("button", { onClick: create_random_new_user, children: "create random new user" }), _jsx("h1", { children: "session upload files test" }), _jsx("input", { type: "file", id: "file_input" }), _jsx("button", { onClick: handle_upload, children: "Upload" }), _jsx("p", { children: "urls of current session uploaded files:" }), session_upload_files.map((file_id) => (_jsxs("button", { onClick: () => window.open(new URL(`/files/${file_id}`, "http://localhost:8000").href, "_blank"), children: ["file ", file_id] }, file_id)))] }));
}
