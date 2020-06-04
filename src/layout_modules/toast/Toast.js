// @flow
import React, { useEffect, useCallback } from "react";
import { useList, useUnmount } from "react-use";
import { useTimeouts } from "../../utils/hooks/useTimeouts";

import "./Toast.scss";
import ToastMessage from "./ToastMessage";

function Toast(props) {
    const { toast } = props;
    const [toasts, { push, remove, clear }] = useList([]);
    const [addTimeout, clearTimeouts] = useTimeouts();

    const removeToast = useCallback(
        toast => {
            toast.show = false;
            remove(toast);
        },
        [remove]
    );

    useEffect(() => {
        if (toast && toast.type === "CLEAR") {
            clear();
            return;
        }
        if (!toast) return;
        toast.show = true;
        push(toast);
        addTimeout(() => removeToast(toast), 3500);
    }, [toast, addTimeout, push, clear, removeToast]);

    useUnmount(clearTimeouts);

    return (
        <div className="Toast-container">
            {toasts.map((toast, index) => (
                <ToastMessage
                    key={index}
                    type={toast.type}
                    show={toast.show}
                    text={toast.text}
                    close={() => removeToast(toast)}
                />
            ))}
        </div>
    );
}

export default Toast;
