import React from "react";
import App from "../App";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions/storeActions";
import * as selectors from "../store/selectors/storeSelectors";
import useSaga from "../utils/hooks/useSaga";
import { useMount, useKey } from "react-use"; //, useLocalStorage
import types from "../constants/modals.types";

function AppContainer() {
    const data = useSelector(selectors.$app);
    const dispatch = useDispatch();
    const [start] = useSaga();

    useMount(() => {
        start("listen");
    });

    const methods = {
        openDialog: () => {
            dispatch(actions.addModal(types.BASE, { id: 10 }));
        },
        showToast: () => {
            dispatch(actions.showToast("Item added succesfully"));
        },
    };

    useKey("F2", () => {
        alert("F2 pressed");
    });

    return <App {...data} {...methods} />;
}

export default AppContainer;
