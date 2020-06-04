import React from "react";
import Dialog from "../layout_modules/dialog/Dialog";
import * as actions from "../store/actions/storeActions";
import { useDispatch } from "react-redux";

const DialogContainer = React.forwardRef((props, ref) => {
    const dispatch = useDispatch();

    const methods = {
        onClose: () => {
            dispatch(actions.popModal());
        },
    };
    return <Dialog {...props} {...methods} ref={ref} />;
});

export default DialogContainer;
