import { types, generateAll } from "../../utils/generateReducers";

export default generateAll({
    appState: {
        single: "appState",
        type: types.SINGLE,
    },
    todos: {
        single: "todo",
        plural: "todos",
        type: types.COLLECTION,
    },
    modal: {
        single: "modal",
        type: types.QUEUE,
    },
});
