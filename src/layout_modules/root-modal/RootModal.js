/**
 * The root modal iterates through the visible modals array
 * and paints each modal on top of each other
 */

import React from "react";
import "./RootModal.scss";
import all from "../../constants/modals";

function RootModal(props) {
    const { modal = [] } = props;

    function renderModal(_modal, index) {
        const { which, params } = _modal;

        const Cmp = all[which];

        const isLast = index === modal.length - 1;

        if (!Cmp) return null;

        return <Cmp key={index} isLast={isLast} {...params} />;
    }

    return modal.map(renderModal);
}

export default RootModal;
