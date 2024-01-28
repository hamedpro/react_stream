var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { ServerSyncContext } from "./ServerSyncContext";
import { io } from "socket.io-client";
import rdiff, { applyDiff } from "recursive-diff";
import { custom_sha256_hash, deep_copy } from "./utils";
import axios from "axios";
export function ServerSyncContextProvider({ children, server_endpoint, }) {
    var [virtual_localstorage, set_virtual_localstorage] = useState(() => {
        if (localStorage.getItem("virtual_localstorage") === null) {
            localStorage.setItem("virtual_localstorage", JSON.stringify({}));
        }
        return localStorage.getItem("virtual_localstorage");
    });
    useEffect(() => {
        localStorage.setItem("virtual_localstorage", virtual_localstorage);
    }, [virtual_localstorage]);
    var [data, set_data] = useState(undefined);
    var set_data_ref = useRef(set_data);
    set_data_ref.current = set_data;
    // Create an instance of axios with baseUrl set to restful_endpoint
    const axiosInstance = axios.create({
        baseURL: server_endpoint,
    });
    function server_post_verb(modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            var clone = deep_copy(data);
            if (clone === undefined) {
                throw new Error("data is not defined yet to be modified.");
            }
            modifier(clone, Math.max(...clone.map((item) => item[0])));
            return yield axiosInstance({
                data: {
                    diff: rdiff.getDiff(data, clone),
                    hash: custom_sha256_hash(data),
                },
                method: "post",
                url: "/change",
            });
        });
    }
    useEffect(() => {
        var websocket = io(server_endpoint, { path: "/ws" });
        websocket.on("data", (diff) => {
            set_data_ref.current((prev) => {
                var clone = prev !== undefined ? deep_copy(prev) : undefined;
                var result = applyDiff(clone, diff);
                return result;
            });
        });
    }, []);
    if (data === undefined) {
        return "first sync with server is not finished yet.";
    }
    return (_jsx(ServerSyncContext.Provider, { value: {
            data,
            server_post_verb,
            set_virtual_localstorage,
            parsed_virtual_localstorage: JSON.parse(virtual_localstorage),
            custom_axios: axiosInstance,
        }, children: children }));
}
