import { useCallback } from "react";
import { useList } from "react-use";

export function useTimeouts() {
    const [list, { push, reset }] = useList();

    const addTimeout = useCallback(
        (callback, delay = 0) => {
            const timeout = setTimeout(callback, delay);
            push(timeout);
        },
        [push]
    );

    const clearTimeouts = useCallback(() => {
        list.forEach(callback => {
            clearTimeout(callback);
        });
        reset();
    }, [list, reset]);

    return [addTimeout, clearTimeouts];
}

export default useTimeouts;
