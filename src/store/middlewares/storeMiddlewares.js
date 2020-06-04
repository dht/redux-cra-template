import todos from "./mid_todos";

const all = {
    todos,
};

export const root_middleware = store => next => async action => {
    let res;

    if (action && action.silent) {
        next(action);
        return;
    }

    for (let mid of Object.values(all)) {
        const temp = await mid(store, action);
        res = res || temp;
    }

    if (res && res.success !== false) {
        next(action);
    }

    if (!res) {
        next(action);
    }

    return res;
};

export default root_middleware;
