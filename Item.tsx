import { useSubscribe } from "./useSubscribe";
import { useParams } from "react-router-dom";

export const Item = () => {
	var item_id = Number(useParams().item_id);
	var { data, update } = useSubscribe({
		subscribe_to: item_id,
		server_endpoint: "http://localhost:8000",
	});
	function update_password() {
		update((prev) => {
			prev[2].password += "*";
			return prev;
		});
	}
	if (data === undefined) {
		return `data not available at the moment.`;
	}
	return (
		<>
			<p>current data : </p>
			{JSON.stringify(data)}
			<button onClick={update_password}>update password </button>
		</>
	);
};
