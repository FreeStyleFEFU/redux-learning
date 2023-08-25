import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

import * as UserActionCreators from "../store/action-creators/user"

export const useActions = () => {
    const dispatch = useDispatch()

    return bindActionCreators(UserActionCreators, dispatch)
}