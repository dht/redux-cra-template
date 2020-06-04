// @flow
import React from "react";
import "./Icon.scss";
import classnames from "classnames";

function Icon(props) {
    const { circle, name, bkColor, color, size = 22, disabled } = props;

    function style() {
        let output = {
            width: size + "rem",
            height: size + "rem",
            lineHeight: size + "rem",
            fontSize: Math.floor(size * 0.75) + "rem",
            borderRadius: size / 2 + "rem",
        };

        if (color) {
            output.color = color;
        }

        return output;
    }

    function onClick() {
        if (disabled) return;
        if (props.onClick) {
            props.onClick();
        }
    }

    const className = classnames(
        "Icon-container material-icons",
        bkColor,
        props.className,
        {
            circle,
            hover: props.onClick,
            disabled,
        }
    );

    return (
        <div
            className={className}
            data-testid={props["data-testid"]}
            style={style()}
            onClick={onClick}
        >
            {name}
        </div>
    );
}

export default Icon;
