import React from "react";
import { useSelector } from "react-redux";
import Toast from "../layout_modules/toast/Toast";
import * as selectors from "../store/selectors/storeSelectors";

function ToastContainer() {
    const data = useSelector(selectors.$toast);
    return <Toast toast={data.toast} />;
}

export default ToastContainer;
