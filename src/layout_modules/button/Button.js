import React from "react";
import Loader from "../loader/Loader";
import Icon from "../icon/Icon";
import "./Button.scss";
import { Button as ButtonSemantic } from "semantic-ui-react";

const Spinner = props => <Loader className={props.classes.spinner} size={20} />;

/**
 *
 * The only true button
 */
function Button(props) {
    const { loading, disabled, icon, ...rest } = props;

    function renderIcon() {
        if (!icon) return null;
        return (
            <div className="icon">
                <Icon className size={20} name={icon} />
            </div>
        );
    }

    function onClick(ev) {
        ev.target.blur();
        props.onClick();
    }

    return (
        <ButtonSemantic
            {...rest}
            onClick={onClick}
            className="Button-container"
            disabled={loading || disabled}
        >
            {renderIcon()}
            {props.children}

            {loading && <Spinner {...rest} />}
        </ButtonSemantic>
    );
}

Button.propTypes = {};

Button.defaultProps = {
    color: "#333",
};

export default Button;
