import { connect } from "react-redux";
import RootModal from "../layout_modules/root-modal/RootModal";
import * as selectors from "../store/selectors/storeSelectors";
import * as actions from "../store/actions/storeActions";

const mapDispatchToProps = dispatch => {
    return {
        popModal: () => {
            dispatch(actions.popModal());
        },
    };
};

export default connect(selectors.$rootModal, mapDispatchToProps)(RootModal);
