import React from "react";
import "./Fa.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames";

function Fa(props) {
    const { family = "fad", icon, style } = props;
    const className = classnames("Fa-container", props.className);
    return (
        <div className={className} style={style}>
            <FontAwesomeIcon className="icon" icon={[family, icon]} />
        </div>
    );
}

Fa.propTypes = {};

Fa.defaultProps = {};

export default Fa;
