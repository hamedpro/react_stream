import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ServerSyncContextProvider } from "./ServerSyncContextProvider";
createRoot(document.getElementById("root")).render(_jsx(ServerSyncContextProvider, { server_endpoint: "http://localhost:8000", children: _jsx(App, {}) }));
