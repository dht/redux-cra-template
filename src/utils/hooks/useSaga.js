import { useCallback } from "react";
import { fork, cancel, call, take } from "redux-saga/effects";
import { useDispatch } from "react-redux";
import { useMount, useUnmount } from "react-use";

let all = {};
const tasks = {};

export function setAll(all_sagas, run = []) {
    all = all_sagas;
}

function* stopSaga(id) {
    const saga = all[id];
    if (!saga) return;

    // console.log("stopping saga -> ", id);

    const task = tasks[id];
    if (!task) return;

    yield cancel(task);
    delete tasks[id];
}

function* watchStop() {
    while (true) {
        const { id } = yield take("SAGA_STOP");
        try {
            yield fork(stopSaga, id);
        } catch (e) {
            console.log("e -> ", e);
        }
    }
}

function* startSaga(id) {
    const saga = all[id];
    if (!saga) return;

    // console.log("saga start -> ", id);

    yield call(stopSaga, id);
    tasks[id] = yield fork(saga);
}

function* watchStart() {
    while (true) {
        const { id } = yield take("SAGA_START");
        try {
            yield fork(startSaga, id);
        } catch (e) {
            console.log("e -> ", e);
        }
    }
}

export function* saga_runner() {
    yield fork(watchStart);
    yield fork(watchStop);
}

export function useSaga() {
    const dispatch = useDispatch();

    const start = useCallback(
        id => {
            dispatch({ type: "SAGA_START", id });
        },
        [dispatch]
    );

    const stop = useCallback(
        id => {
            dispatch({ type: "SAGA_STOP", id });
        },
        [dispatch]
    );

    function isRunning(id) {
        return typeof tasks[id] === "object";
    }

    return [start, stop, isRunning];
}

export function useToggleSaga(id) {
    const [startSaga, stopSaga, isRunning] = useSaga();

    useMount(() => {
        startSaga(id);
    });

    useUnmount(() => {
        stopSaga(id);
    });

    return [startSaga, stopSaga, isRunning];
}

export default useSaga;
