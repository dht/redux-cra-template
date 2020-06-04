// import * as api from "../../api";

export const todos_middleware = async (store, action) => {
    let output;

    switch (action.type) {
        case "PATCH_TODOS":
            // output = await api.api_patchAlerts(action.id, action.value);
            output = true;
            break;
        default:
    }

    return output;
};

export default todos_middleware;
