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
