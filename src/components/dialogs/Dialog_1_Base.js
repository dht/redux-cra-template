import React from "react";
import DialogContainer from "../DialogContainer";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions/storeActions";
import zd from "../../store/selectors/storeDialogs";
import dialogs from "../../constants/dialogs";

function Dialog_1_Base(props) {
    const config = dialogs.Dialog_1_Base;

    const data = useSelector(zd[config.selectorName]);
    const dispatch = useDispatch();

    const methods = {
        onSave: data => {
            console.log("data -> ", data);
            return dispatch(actions.blank());
        },
    };

    return (
        <DialogContainer config={config} {...props} data={data} {...methods} />
    );
}

export default Dialog_1_Base;
