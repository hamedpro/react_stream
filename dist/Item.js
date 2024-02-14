import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(_Fragment, { children: [_jsx("p", { children: "current data : " }), JSON.stringify(data), _jsx("button", { onClick: update_password, children: "update password " })] }));
};
