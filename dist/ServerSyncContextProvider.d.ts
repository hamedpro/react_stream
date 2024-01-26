import { ReactNode } from "react";
export declare function ServerSyncContextProvider<data extends object>({ children, server_endpoint, }: {
    children: ReactNode;
    server_endpoint: string;
}): import("react/jsx-runtime").JSX.Element | "first sync with server is not finished yet.";
