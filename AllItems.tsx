import { useSubscribe } from "./useSubscribe";
import { useParams } from "react-router-dom";
export const AllItems = () => {
	var { data, update } = useSubscribe({
		subscribe_to: "*",
		server_endpoint: "http://localhost:8000",
	});
	if (data === undefined) {
		return `data not available at the moment.`;
	}
	return JSON.stringify(data);
};
