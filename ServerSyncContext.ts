import { Dispatch, SetStateAction, createContext } from "react";
import { server_post_verb, server_put_verb } from "./types";
import { store_standard_type } from "./utils";
export const ServerSyncContext = createContext<{
	data: store_standard_type;
	server_post_verb: server_post_verb;
	server_put_verb: server_put_verb;
	parsed_virtual_localstorage: { [key: string]: any };
	set_virtual_localstorage: Dispatch<SetStateAction<string>>;
}>({
	data: {},
	server_post_verb: () => {
		throw new Error("this function not implemented in context default value");
	},
	server_put_verb: () => {
		throw new Error("this function not implemented in context default value");
	},
	parsed_virtual_localstorage: {},
	set_virtual_localstorage: () => {
		throw new Error("this function not implemented in context default value");
	},
});
