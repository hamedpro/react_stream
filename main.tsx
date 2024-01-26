import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ServerSyncContextProvider } from "./ServerSyncContextProvider";
createRoot(document.getElementById("root")!).render(
	<ServerSyncContextProvider server_endpoint="http://localhost:8000">
		<App />
	</ServerSyncContextProvider>
);
