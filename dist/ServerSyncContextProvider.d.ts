import { ReactNode } from "react";
export declare function ServerSyncContextProvider<data extends object>({ children, server_endpoint, }: {
    children: ReactNode;
    server_endpoint: string;
}): "first sync with server is not finished yet." | import("react/jsx-runtime").JSX.Element;
