import { store_standard_type } from "./utils";
export type server_put_verb = (jsonPath: string[], newData: any) => void;
export type server_post_verb = (modifier: (prev: store_standard_type) => void) => void;
