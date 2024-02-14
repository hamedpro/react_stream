var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import rdiff, { applyDiff } from "recursive-diff";
import { custom_sha256_hash, deep_copy, } from "./utils";
import axios from "axios";
export function useSubscribe({ subscribe_to, server_endpoint, }) {
    var [data, set_data] = useState(undefined);
    var set_data_ref = useRef(set_data);
    set_data_ref.current = set_data;
    // Create an instance of axios with baseUrl set to restful_endpoint
    const axiosInstance = axios.create({
        baseURL: server_endpoint,
    });
    function update(modifier) {
        return __awaiter(this, void 0, void 0, function* () {
            if (subscribe_to === "*") {
                throw "for an instance which is subscribed to '*', update function is not implemented yet.";
            }
            if (data === undefined) {
                throw new Error("i dont have data of this item cached yet so i can not do any modification on it.");
            }
            var clone = deep_copy(data);
            // type of data can not be undefined or store_standard_type here
            var modified = modifier(clone);
            var custom_axios = axios.create({ baseURL: server_endpoint });
            return yield custom_axios({
                data: {
                    diff: rdiff.getDiff(data, modified),
                    hash: custom_sha256_hash(data),
                },
                method: "put",
                url: `/items/${subscribe_to}`,
            });
        });
    }
    var socket_ref = useRef(undefined);
    useEffect(() => {
        if (socket_ref.current !== undefined) {
            socket_ref.current.disconnect();
        }
        var websocket = io(server_endpoint, { path: "/ws" });
        websocket.on("data", (diff) => {
            set_data_ref.current((prev) => {
                var clone = prev !== undefined ? deep_copy(prev) : undefined;
                var result = applyDiff(clone, diff);
                return result;
            });
        });
        websocket.emit("subscribe_to_item", subscribe_to);
        return () => {
            if (socket_ref.current !== undefined) {
                socket_ref.current.disconnect();
            }
        };
    }, [subscribe_to]);
    return { update, data };
}
