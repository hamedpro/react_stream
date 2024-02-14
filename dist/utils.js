var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import { SHA256 } from "crypto-js";
export function deep_copy(input) {
    return JSON.parse(JSON.stringify(input));
}
export function custom_sha256_hash(input) {
    var inputString;
    try {
        inputString = JSON.stringify(input);
    }
    catch (error) {
        throw new Error("Unable to stringify input");
    }
    const hash = SHA256(inputString).toString();
    return hash;
}
export function new_item(server_endpoint, type, value) {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield axios({
            baseURL: server_endpoint,
            url: "/items",
            method: "post",
            data: { type, value },
        });
        return response.data.new_item_id;
    });
}
export function generateRandomString(length = 7) {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
