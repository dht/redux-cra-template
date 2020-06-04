import { useDispatch } from "react-redux";

export const useDispatchP = () => {
    const dispatch = useDispatch();

    return action => {
        return new Promise((resolve, reject) => {
            let newAction = {
                ...action,
                resolve,
                reject,
            };

            dispatch(newAction);
        });
    };
};

export default useDispatchP;
