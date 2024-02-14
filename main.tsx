import { createRoot } from "react-dom/client";
import { Root } from "./Root";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AllItems } from "./AllItems";
import { Item } from "./Item";
createRoot(document.getElementById("root")!).render(
	<>
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={<Root />}
				/>
				<Route
					path="/items"
					element={<AllItems />}
				/>
				<Route
					path="/items/:item_id"
					element={<Item />}
				/>
			</Routes>
		</BrowserRouter>
	</>
);
